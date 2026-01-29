import os
import sys
import argparse
from lib.xq_dde import XQDDEClient
from lib.cb_service import CBService

# --- Configuration ---
SERVICE_ACCOUNT_PATH = os.path.join(os.path.dirname(__file__), '../service-account.json')

def sync_cb_data(dry_run=False):
    """
    主要同步任務流程
    """
    print(f"[System] Initializing Services (Dry Run: {dry_run})...")
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
            
            # A. 抓取可轉債行情 (優先嘗試 .TWO)
            price = None
            for suffix in ['.TWO', '.TW']:
                query = f"{code}{suffix}-Price,ChangePercent"
                res = dde_client.request(query)
                if res and res != 'N/A':
                    try:
                        parts = res.split(';')
                        if parts[0] != '-' and parts[0]:
                            price = float(parts[0])
                            update_payload['price'] = price
                            if len(parts) > 1 and parts[1] != '-':
                                update_payload['changePercent'] = f"{parts[1]}%"
                            break
                    except: continue

            # B. 抓取標的股票行情
            underlying = item.get('underlyingCode')
            if not underlying and len(code) == 5: underlying = code[:4]
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
                print(f"   [OK] {code}: P={update_payload.get('price', '-')} S={update_payload.get('stockPrice', '-')}")
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
    args = parser.parse_args()

    sync_cb_data(dry_run=args.dry_run)

if __name__ == "__main__":
    main()
