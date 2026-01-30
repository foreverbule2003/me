import os
import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore
import argparse

# Configuration
SERVICE_ACCOUNT_PATH = os.path.join(os.path.dirname(__file__), '../service-account.json')

def import_xlsx(file_path, dry_run=False):
    if not os.path.exists(file_path):
        print(f"❌ Error: Excel file not found at {file_path}")
        return

    if not os.path.exists(SERVICE_ACCOUNT_PATH):
        print(f"❌ Error: Service account file not found at {SERVICE_ACCOUNT_PATH}")
        return

    # Initialize Firebase
    if not firebase_admin._apps:
        cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
        firebase_admin.initialize_app(cred)
    
    db = firestore.client()
    
    print(f"📂 Reading Excel from {file_path}...")
    df = pd.read_excel(file_path)
    
    # Standardize columns
    col_map = {
        '代碼': 'code',
        '商品': 'name',
        '轉換價格': 'conversionPrice'
    }
    df = df.rename(columns=col_map)
    
    updates_count = 0
    batch = db.batch()
    
    for _, row in df.iterrows():
        # Handle code (could be float from Excel)
        raw_code = row.get('code')
        if pd.isna(raw_code): continue
        
        # Format code as string without .0
        code = str(int(raw_code)) if isinstance(raw_code, (float, int)) else str(raw_code).strip()
        
        data = {
            "updatedAt": firestore.SERVER_TIMESTAMP
        }
        
        if not pd.isna(row.get('name')): data['name'] = str(row['name']).strip()
        if not pd.isna(row.get('conversionPrice')): 
            try: data['conversionPrice'] = float(row['conversionPrice'])
            except: pass
            
        if len(data) > 1:
            doc_ref = db.collection('cb_history').document(code)
            if dry_run:
                print(f"   [Dry Run] {code}: {data}")
            else:
                batch.set(doc_ref, data, merge=True)
            
            updates_count += 1
            if updates_count % 50 == 0 and not dry_run:
                batch.commit()
                batch = db.batch()
                print(f"   ☁️  Committed {updates_count} items...")

    if updates_count % 50 != 0 and not dry_run:
        batch.commit()
    
    print(f"\n✨ Processed {updates_count} items.")
    if dry_run:
        print("🔍 This was a dry run. No data was written to Firestore.")
    else:
        print("✅ Data successfully synced to Firestore.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Import CB Metadata from Excel to Firestore")
    parser.add_argument("file", help="Path to the Excel file")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes")
    args = parser.parse_args()
    
    import_xlsx(args.file, dry_run=args.dry_run)
