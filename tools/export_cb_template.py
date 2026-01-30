import os
import csv
import firebase_admin
from firebase_admin import credentials, firestore

# Configuration
SERVICE_ACCOUNT_PATH = os.path.join(os.path.dirname(__file__), '../service-account.json')
OUTPUT_CSV = os.path.join(os.path.dirname(__file__), '../cb_meta_template.csv')

def export_template():
    if not os.path.exists(SERVICE_ACCOUNT_PATH):
        print(f"❌ Error: Service account file not found at {SERVICE_ACCOUNT_PATH}")
        return

    # Initialize Firebase
    if not firebase_admin._apps:
        cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
        firebase_admin.initialize_app(cred)
    
    db = firestore.client()
    
    # Get all items in cb_history
    docs = db.collection('cb_history').stream()
    
    fieldnames = ['code', 'name', 'conversionPrice', 'underlyingCode', 'category']
    count = 0
    with open(OUTPUT_CSV, mode='w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictReader(f, fieldnames=fieldnames) # Just for structure? No, use DictWriter
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        for doc in docs:
            data = doc.to_dict()
            writer.writerow({
                'code': doc.id,
                'name': data.get('name', ''),
                'conversionPrice': data.get('conversionPrice', 0),
                'underlyingCode': data.get('underlyingCode', ''),
                'category': data.get('category', '')
            })
            count += 1
    
    print(f"✅ Template exported to {OUTPUT_CSV} with {count} items.")
    print("💡 Tip: Fill in the 'conversionPrice' column and then run:")
    print(f"   python tools/import_cb_meta.py {OUTPUT_CSV}")

if __name__ == "__main__":
    export_template()
