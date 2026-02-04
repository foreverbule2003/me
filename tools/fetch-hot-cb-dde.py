import os
import sys
import time
import datetime
import json
import firebase_admin
from firebase_admin import credentials, firestore
from lib.xq_dde import XQDDEClient

# --- Configuration ---
# XQ DDE Service Name (Usually 'XQLITE' for XQ Personal, 'XQ' for Enterprise)
# Try 'XQLITE' first as per xq_dde.py default.
DDE_SERVICE = 'XQLITE'
DDE_TOPIC = 'Quote'

# Fields to fetch Map: { FirestoreField: DDEFieldSuffix }
# Verified via diagnostic: Price works, DealPrice returned -. 
FIELD_MAP = {
    'price': '-Price',
    'change': '-Change',
    'changePercent': '-ChangePercent',
    'volume': '-TotalVolume', 
    'open': '-Open',
    'high': '-High',
    'low': '-Low',
    'yesterdayClose': '-PreClose', # Verified: RefPrice was empty, PreClose works.
    'name': '-Name',
    'underlyingCode': '-UnderlyingCode',
    'conversionPrice': '-StrikePrice' 
}

# --- Firebase Setup ---
def init_firebase():

    """Initialize Firebase Admin SDK"""
    cred_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'serviceAccountKey.json')
    
    if not os.path.exists(cred_path):
        # Try finding it in env or other locations if needed, but local file is primary for this tool
        print(f"[Error] Key file not found at {cred_path}")
        sys.exit(1)

    cred = credentials.Certificate(cred_path)
    try:
        firebase_admin.get_app()
    except ValueError:
        firebase_admin.initialize_app(cred)
    
    return firestore.client()

def get_tracked_codes(db):
    """Fetch tracked codes from cb_history or a specific collection"""
    print("[Firebase] Fetching tracked CB list...")
    docs = db.collection('cb_history').stream()
    codes = []
    for doc in docs:
        codes.append(doc.id)
    print(f"[Firebase] Found {len(codes)} tracked items.")
    return codes

def fetch_dde_data(codes):
    """Fetch data for codes using DDE"""
    results = []
    
    print(f"[DDE] Connecting to {DDE_SERVICE}|{DDE_TOPIC}...")
    
    with XQDDEClient(service=DDE_SERVICE, topic=DDE_TOPIC) as dde:
        if not dde.connected:
            print("[Error] Could not connect to XQ DDE. Is XQ running?")
            return []

        print(f"[DDE] Fetching data for {len(codes)} items...")
        
        for i, code in enumerate(codes):
            item_data = {
                'code': code, 
                'timestamp': int(time.time()*1000)
            }
            
            # Diagnostic showed .TW is required and works.
            target_symbol = f"{code}.TW" 
            
            fields = {
                'DealPrice': 'price', # Fallback key? No, map is DDE->Out
                # Let's fix the logic below, we iterate FIELD_MAP now
            }
            
            # Correct Iteration based on Global FIELD_MAP
            success_fields = 0
            for out_key, suffix in FIELD_MAP.items():
                query = f"{target_symbol}{suffix}"
                val = dde.request(query)
                
                if not val or val == 'N/A' or val == '-':
                     # Try .TWO just in case logic differs for some
                     val = dde.request(f"{code}.TWO{suffix}")

                if val and val != 'N/A' and val != '-':
                    if out_key in ['price', 'change', 'volume', 'high', 'low', 'yesterdayClose', 'conversionPrice']:
                        try:
                            item_data[out_key] = float(val)
                            success_fields += 1
                        except:
                             # Keep original if float conversion fails (e.g. empty string)
                            pass 
                    elif out_key == 'changePercent':
                        try:
                            f_val = float(val)
                            item_data[out_key] = f"{f_val:.2f}%"
                        except:
                            item_data[out_key] = val
                    else:
                        item_data[out_key] = val
                        if out_key == 'name': item_data['name'] = val.replace('?', '').strip()

            # Fallback: If Price is missing (no trade), use PreClose (YesterdayClose)
            if 'price' not in item_data and 'yesterdayClose' in item_data:
                # Only if we have a valid yesterday close
                try:
                    yc = float(item_data['yesterdayClose'])
                    if yc > 0:
                        item_data['price'] = yc
                        # Mark as no trade?
                        item_data['change'] = 0
                        item_data['changePercent'] = "0.00%"
                        item_data['volume'] = 0
                except: pass

            # Enrich Stock Price
            if 'underlyingCode' in item_data:
                u_code = str(item_data['underlyingCode']).split('.')[0]
                s_val = dde.request(f"{u_code}.TW-Price") # Use Price not DealPrice
                if s_val and s_val != 'N/A':
                    try:
                        item_data['stockPrice'] = float(s_val)
                    except: pass

            if 'price' in item_data:
                print(f"  + {code}: {item_data.get('name', '')} P={item_data.get('price')} S={item_data.get('stockPrice', '-')}")
                results.append(item_data)
            else:
                print(f"  - {code}: No data ({target_symbol})")
            
            if i % 20 == 0: time.sleep(0.1)

    return results

def save_to_firestore(db, data):
    """Save snapshot to Firestore"""
    if not data:
        print("[Cloud] No data to save.")
        return

    today_str = datetime.datetime.now().strftime("%Y-%m-%d")
    
    doc_ref = db.collection('hot_cb_snapshots').document(today_str)
    
    payload = {
        'date': today_str,
        'updatedAt': firestore.SERVER_TIMESTAMP,
        'items': data, 
        'count': len(data),
        'source': 'DDE'
    }
    
    doc_ref.set(payload, merge=True)
    print(f"[Cloud] Snapshot saved: hot_cb_snapshots/{today_str}")
    
    db.collection('hot_cb_meta').document('latest').set({
        'lastDateId': today_str,
        'updatedAt': firestore.SERVER_TIMESTAMP
    })
    print("[Cloud] Meta 'latest' updated.")

def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--code", help="Sync only a specific CB code")
    args = parser.parse_args()

    db = init_firebase()
    
    if args.code:
        codes = [args.code]
        print(f"[Mode] Single Sync: {args.code}")
    else:
        codes = get_tracked_codes(db)
    
    if not codes:
        print("No codes to track.")
        return

    data = fetch_dde_data(codes)
    save_to_firestore(db, data)
    print("Done.")

if __name__ == "__main__":
    main()
