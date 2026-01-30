import os
import sys
import argparse
from lib.xq_dde import XQDDEClient
from lib.cb_service import CBService

# --- Configuration ---
SERVICE_ACCOUNT_PATH = os.path.join(os.path.dirname(__file__), '../service-account.json')

def clean_cb_name(code, original_name):
    """
    根據 CB 代碼末位修正名稱（處理 XQ DDE 傳回的 '?' 亂碼）
    例如：13164, '上曜?' -> '上曜四'
    """
    if not original_name: return original_name
    
    # 數字對應中文字次
    ordinals = {
        '1': '一', '2': '二', '3': '三', '4': '四', '5': '五',
        '6': '六', '7': '七', '8': '八', '9': '九', '0': '零'
    }
    
    name = original_name.strip()
    # 移除末尾的問號或亂碼
    if name.endswith('?') or name.endswith('？'):
        name = name[:-1].strip()
    
    # 檢查代碼末位
    if len(code) == 5:
        last_digit = code[4]
    elif len(code) == 6 and code[4] == '0':
        last_digit = code[5]
    else:
        last_digit = None
        
    if last_digit in ordinals:
        target_ordinal = ordinals[last_digit]
        # 如果名稱中已經包含該字次（例如「鮮活果汁一K」已經有「一」），則不重複添加
        if target_ordinal not in name:
            # 特殊處理 6 碼代號 (E 系列)
            if len(code) == 6:
                suffix = f"E{last_digit}" if "E" not in name.upper() else last_digit
                name += suffix
            else:
                name += target_ordinal
                
    return name

def sync_cb_data(dry_run=False, sync_meta=False):
    """
    主要同步任務流程
    """
    print(f"[System] Initializing Services (Dry Run: {dry_run}, Sync Meta: {sync_meta})...")
    cb_service = CBService(SERVICE_ACCOUNT_PATH)
    
    # 1. 獲取標的名單
    items = cb_service.get_tracked_items()
    if not items:
        print("[Sync] No items found in database.")
        return

    print(f"[Sync] Found {len(items)} items. Initializing DDE...")

    # 2. 啟動 DDE 客戶端並執行同步
    updates = {}
    with XQDDEClient() as dde_client:
        if not dde_client.connected:
            print("❌ Cannot connect to XQ DDE. Ensure XQ is running.")
            return

        for item in items:
            code = item['id']
            update_payload = {}
            
            # --- A. 抓取行情數據 (每秒成交價) ---
            price = None
            for suffix in ['.TWO', '.TW']:
                query = f"{code}{suffix}-Price,ChangePercent"
                res = dde_client.request(query)
                if res and res != 'N/A' and res != '-':
                    try:
                        parts = res.split(';')
                        if parts[0] != '-' and parts[0]:
                            price = float(parts[0])
                            update_payload['price'] = price
                            if len(parts) > 1 and parts[1] != '-' and parts[1] != 'N/A':
                                update_payload['changePercent'] = f"{parts[1]}%"
                            break
                    except: continue

            # --- B. 抓取 Metadata (僅在需要時或指定 --meta 時) ---
            if sync_meta:
                # 1. 抓取名稱
                name_fields = ["Name", "CName", "ShortName"]
                for f in name_fields:
                    name_res = dde_client.request(f"{code}.TW-{f}") or dde_client.request(f"{code}.TWO-{f}")
                    if name_res and name_res != 'N/A' and name_res != '-':
                        # 套用名稱修正邏輯
                        update_payload['name'] = clean_cb_name(code, name_res)
                        break

                # 2. 抓取轉換價格 (嘗試多個可能欄位)
                # 註：不同 XQ 版本或標的類型可能使用不同欄位名。
                # 根據使用者提供之 XQLITE 範例，轉換價格為 'CV'。
                
                # 只有當目前資料中沒有轉換價格或是 0 時，才從 DDE 抓取並更新
                current_cp = item.get('conversionPrice', 0)
                if current_cp == 0:
                    cp_fields = ["CV", "轉換價格", "ConversionPrice", "ExercisePrice", "StrikePrice", "StrikeFactor"]
                    for f in cp_fields:
                        cp_res = dde_client.request(f"{code}.TW-{f}") or dde_client.request(f"{code}.TWO-{f}")
                        if cp_res and cp_res != 'N/A' and cp_res != '-':
                            try:
                                cp_val = float(cp_res)
                                if cp_val > 0:
                                    update_payload['conversionPrice'] = cp_val
                                    break
                            except: continue

                # 3. 抓取已轉換比例 (CVProportion)
                cvp_res = dde_client.request(f"{code}.TW-CVProportion") or dde_client.request(f"{code}.TWO-CVProportion")
                if cvp_res and cvp_res != 'N/A' and cvp_res != '-':
                    try:
                        update_payload['alreadyConvertedRatio'] = float(cvp_res)
                    except: pass

                # 4. 抓取標的代號 (若 DDE 有提供)
                under_fields = ["UnderlyingCode", "Underlying", "標的代號"]
                for f in under_fields:
                    u_res = dde_client.request(f"{code}.TW-{f}") or dde_client.request(f"{code}.TWO-{f}")
                    if u_res and u_res != 'N/A' and u_res != '-':
                        update_payload['underlyingCode'] = u_res.split('.')[0] # 移除 .TW 等後綴
                        break

            # --- C. 抓取標的股票行情 ---
            underlying = update_payload.get('underlyingCode') or item.get('underlyingCode')
            # 支援 5 或 6 位數代號推算 (例如 24673 -> 2467, 370201 -> 3702)
            if not underlying:
                if len(code) == 5: underlying = code[:4]
                elif len(code) == 6: underlying = code[:4]
                update_payload['underlyingCode'] = underlying # 存入推算的標的
            
            if underlying:
                for suffix in ['.TW', '.TWO']:
                    res = dde_client.request(f"{underlying}{suffix}-Price")
                    if res and res != 'N/A' and res != '-':
                        try:
                            update_payload['stockPrice'] = float(res)
                            break
                        except: continue

            if update_payload:
                updates[code] = update_payload
                status_str = f"   [OK] {code}"
                if 'name' in update_payload: status_str += f" ({update_payload['name']})"
                if 'price' in update_payload: status_str += f" P={update_payload['price']}"
                if 'stockPrice' in update_payload: status_str += f" S={update_payload['stockPrice']}"
                if 'conversionPrice' in update_payload: status_str += f" CP={update_payload['conversionPrice']}"
                if 'alreadyConvertedRatio' in update_payload: status_str += f" CVP={update_payload['alreadyConvertedRatio']}%"
                if 'underlyingCode' in update_payload: status_str += f" UC={update_payload['underlyingCode']}"
                print(status_str)
            else:
                print(f"   [SKIP] {code}: No data fetched.")

    # 3. 執行雲端寫入
    if not dry_run and updates:
        print(f"[Cloud] Commitment: Syncing {len(updates)} updates to Firestore...")
        cb_service.batch_update_market_data(updates)
        print("✅ Sync Complete.")
    else:
        print(f"[Dry Run] Simulation finished. {len(updates)} items would have been updated.")

def main():
    parser = argparse.ArgumentParser(description="XQ DDE to Firestore Sync Bridge")
    parser.add_argument("--dry-run", action="store_true", help="Preview data without writing to Firebase")
    parser.add_argument("--meta", action="store_true", help="Sync metadata (Name, Conversion Price, etc.)")
    args = parser.parse_args()

    sync_cb_data(dry_run=args.dry_run, sync_meta=args.meta)

if __name__ == "__main__":
    main()
