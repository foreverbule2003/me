import os
import csv
import firebase_admin
from firebase_admin import credentials, firestore
import argparse

# Configuration
SERVICE_ACCOUNT_PATH = os.path.join(os.path.dirname(__file__), '../service-account.json')

def import_meta(csv_path, dry_run=False):
    if not os.path.exists(csv_path):
        print(f"❌ Error: CSV file not found at {csv_path}")
        return

    if not os.path.exists(SERVICE_ACCOUNT_PATH):
        print(f"❌ Error: Service account file not found at {SERVICE_ACCOUNT_PATH}")
        return

    # Initialize Firebase
    if not firebase_admin._apps:
        cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
        firebase_admin.initialize_app(cred)
    
    db = firestore.client()
    
    print(f"📂 Reading metadata from {csv_path}...")
    updates = 0
    with open(csv_path, mode='r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        batch = db.batch()
        count = 0
        
        for row in reader:
            # Expected columns: code, name, conversionPrice, underlyingCode, category
            code = row.get('code')
            if not code: continue
            
            data = {
                "updatedAt": firestore.SERVER_TIMESTAMP
            }
            
            if row.get('name'): data['name'] = row['name']
            if row.get('conversionPrice'): 
                try: data['conversionPrice'] = float(row['conversionPrice'])
                except: pass
            if row.get('underlyingCode'): data['underlyingCode'] = row['underlyingCode']
            if row.get('category'): data['category'] = row['category']
            
            if len(data) > 1:
                doc_ref = db.collection('cb_history').document(code)
                if dry_run:
                    print(f"   [Dry Run] {code}: {data}")
                else:
                    batch.set(doc_ref, data, merge=True)
                
                count += 1
                if count % 20 == 0 and not dry_run:
                    batch.commit()
                    batch = db.batch()
                    print(f"   ☁️  Committed {count} items...")

        if count % 20 != 0 and not dry_run:
            batch.commit()
        
        print(f"\n✨ Processed {count} items.")
        if dry_run:
            print("🔍 This was a dry run. No data was written to Firestore.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Batch Import CB Metadata to Firestore")
    parser.add_argument("csv", help="Path to the CSV file")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without writing")
    args = parser.parse_args()
    
    import_meta(args.csv, dry_run=args.dry_run)
