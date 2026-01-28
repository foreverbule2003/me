import os
import time
import json
import firebase_admin
from firebase_admin import credentials, firestore
import win32ui
import dde

# --- Configuration ---
# XQ DDE Service Name (Check your XQ settings, usually 'XQLITE' or 'XQ7')
DDE_SERVICE = 'XQLITE'
DDE_TOPIC = 'Quote'

# Fields to fetch for each CB
# XQ Syntax usually: {Code}-{Field}
FIELDS_MAP = {
    'price': 'Price',
    'change': 'Change',
    'changePercent': 'ChangePercent',
    'volume': 'Volume',
    'high': 'High',
    'low': 'Low',
    'bid': 'Bid',
    'ask': 'Ask'
}

# Path to service account (Same as Node.js project)
SERVICE_ACCOUNT_PATH = os.path.join(os.path.dirname(__file__), '../service-account.json')

# --- Firebase Setup ---
def init_firebase():
    if not firebase_admin._apps:
        cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
        firebase_admin.initialize_app(cred)
    return firestore.client()

# --- DDE Client ---
class XQDDEClient:
    def __init__(self, service, topic):
        self.service = service
        self.topic = topic
        self.server = dde.CreateServer()
        self.server.Create("XQBridge")
        self.conversation = dde.CreateConversation(self.server)
        self.connected = False

    def connect(self):
        try:
            self.conversation.ConnectTo(self.service, self.topic)
            self.connected = True
            print(f"[DDE] Connected to {self.service}|{self.topic}")
        except Exception as e:
            print(f"[DDE] Connection failed: {e}")
            self.connected = False

    def request(self, item, silent=False):
        if not self.connected:
            self.connect()
            if not self.connected: 
                return None
        
        try:
            # XQ DDE usually expects simple strings
            # Try/Catch because DDE can hang or fail
            return self.conversation.Request(item)
        except Exception as e:
            if not silent:
                print(f"[DDE] Request Error ({item}): {e}")
            return None

    def close(self):
        if self.connected:
            self.server.Shutdown()

# --- Main Logic ---
def main():
    if not os.path.exists(SERVICE_ACCOUNT_PATH):
        print(f"Error: service-account.json not found at {SERVICE_ACCOUNT_PATH}")
        return

    print("[System] Initializing Firebase...")
    db = init_firebase()
    
    print(f"[System] Initializing DDE ({DDE_SERVICE})...")
    client = XQDDEClient(DDE_SERVICE, DDE_TOPIC)
    client.connect()

    if not client.connected:
        print("❌ Cannot connect to XQ DDE. Please ensure XQ application is running.")
        return

    print("✅ System Ready. Starting Sync (Single Pass)...")

    try:
        # 1. Fetch Tracked List from Firestore
        docs = db.collection('cb_history').stream()
        tracked_items = []
        for doc in docs:
            tracked_items.append(doc.to_dict() | {'id': doc.id})
        
        if not tracked_items:
            print("[Sync] No items in cb_history. Exiting.")
            return

        print(f"[Sync] Found {len(tracked_items)} items. Checking for corrupted names...")

        # Load Static Master Data for Name & Conversion Price Fix
        try:
            # Use absolute path relative to script location to avoid CWD issues
            base_dir = os.path.dirname(__file__)
            master_db_path = os.path.join(base_dir, '../public/data/cb-data.json')
            
            with open(master_db_path, 'r', encoding='utf-8') as f:
                master_data = json.load(f)
                # Create a lookup map: "11011" -> {name, conversionPrice}
                master_map = {item['code']: item for item in master_data.get('items', [])}
                print(f"[System] Loaded {len(master_map)} items from master DB for validation.")
        except Exception as e:
            print(f"[Warning] Could not load master DB: {e}")
            master_map = {}
        
        batch = db.batch()
        batch_count = 0
        
        for item in tracked_items:
            code = item['id']
            update_data = {'updatedAt': firestore.SERVER_TIMESTAMP}
            
            # --- Integrity Check (Name & Conversion Price) ---
            master_item = master_map.get(code)
            if master_item:
                # 1. Sync Name
                correct_name = master_item.get('name')
                current_name = item.get('name', '')
                if correct_name and ('?' in current_name or not current_name):
                    print(f"   🔧 Fixing Name: {code} {current_name} -> {correct_name}")
                    update_data['name'] = correct_name
                    item['name'] = correct_name 

                # 2. Sync Conversion Price (Critical for Parity calculation)
                correct_conv = master_item.get('conversionPrice')
                current_conv = item.get('conversionPrice')
                if correct_conv and correct_conv != current_conv:
                    print(f"   🔧 Syncing ConvPrice: {code} {current_conv} -> {correct_conv}")
                    update_data['conversionPrice'] = correct_conv
                    item['conversionPrice'] = correct_conv
            
            # A. Fetch CB Data
            # CBs in Taiwan are OTC (Two), so .TWO should be preferred.
            # We will try .TWO first, then .TW
            
            price = None
            xq_code_used = None # Helper to know which suffix worked

            found_price = False
            for suffix in ['.TWO', '.TW']:
                try_code = f"{code}{suffix}"
                # Request multiple fields to ensure High Precision (XQ quirk)
                # Response format: "128.05;3.55;志聖二"
                query = f"{try_code}-Price,ChangePercent,Name"
                
                res = client.request(query, silent=True)
                if res and res.strip() and res.strip() != 'N/A':
                    try:
                        # Clean null bytes
                        res_clean = res.replace('\x00', '')
                        parts = res_clean.split(';')
                        
                        # 1. Price
                        if len(parts) >= 1 and parts[0].strip() != '-' and parts[0].strip():
                            val = float(parts[0].strip())
                            update_data['price'] = val
                            found_price = True
                            print(f"      [OK] {try_code} -> ${val}")
                        
                        # 2. ChangePercent
                        if len(parts) >= 2 and parts[1].strip() != '-' and parts[1].strip():
                            update_data['changePercent'] = f"{parts[1].strip()}%"

                        # 3. Name (Only update if missing to protect against corruption)
                        if len(parts) >= 3 and not item.get('name'):
                            n_str = parts[2].strip()
                            if n_str:
                                update_data['name'] = n_str
                        
                        if found_price:
                            break
                    except ValueError:
                        continue
            
            if not found_price:
                 print(f"      [SKIP] Could not fetch price for {code}")

            # B. Fetch Underlying Stock Data
            underlying_code = item.get('underlyingCode')
            if not underlying_code and len(code) == 5:
                underlying_code = code[:4]
                update_data['underlyingCode'] = underlying_code

            if underlying_code:
                s_price = None
                for suffix in ['.TW', '.TWO']:
                    try_code = f"{underlying_code}{suffix}"
                    # Use combo request to force precision (Price, High)
                    res = client.request(f"{try_code}-Price,High", silent=True)
                    if res and res.strip():
                        try:
                            parts = res.replace('\x00', '').split(';')
                            if len(parts) >= 1 and parts[0].strip() != '-':
                                s_price = float(parts[0].strip())
                                break
                        except: continue
                
                if s_price:
                    update_data['stockPrice'] = s_price

            # Add to Batch
            ref = db.collection('cb_history').document(code)
            batch.set(ref, update_data, merge=True)
            batch_count += 1
            
            print(f"   -> {code}: P={update_data.get('price', '-')} S={update_data.get('stockPrice', '-')}")

        # Commit Batch
        if batch_count > 0:
            batch.commit()
            print("   [Cloud] Firestore Batch Updated.")
        
        print("[System] Sync Complete. Exiting.")

    except Exception as e:
        print(f"\n[Error] {e}")
    finally:
        client.close()

if __name__ == "__main__":
    main()
