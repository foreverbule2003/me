import os
import json
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# Configuration
SERVICE_ACCOUNT_PATH = os.path.join(os.path.dirname(__file__), '../service-account.json')
OUTPUT_JSON = os.path.join(os.path.dirname(__file__), '../public/data/cb-data.json')

def export_to_json():
    if not os.path.exists(SERVICE_ACCOUNT_PATH):
        print(f"❌ Error: Service account file not found at {SERVICE_ACCOUNT_PATH}")
        return

    # Initialize Firebase
    if not firebase_admin._apps:
        cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
        firebase_admin.initialize_app(cred)
    
    db = firestore.client()
    
    print("☁️  Fetching latest CB data from Firestore...")
    docs = db.collection('cb_history').stream()
    
    items = []
    for doc in docs:
        data = doc.to_dict()
        # Convert Firestore Timestamps to ISO strings for JSON
        item = {
            "code": doc.id,
            "name": data.get("name", ""),
            "underlyingCode": data.get("underlyingCode", ""),
            "conversionPrice": data.get("conversionPrice", 0),
            "cbPrice": data.get("price", 0),
            "stockPrice": data.get("stockPrice", 0),
            "category": data.get("category", ""),
            "changePercent": data.get("changePercent", "0.00%")
        }
        items.append(item)
    
    # Sort by code for consistency
    items.sort(key=lambda x: x['code'])
    
    result = {
        "updatedAt": datetime.now().isoformat(),
        "items": items
    }
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
    
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Exported {len(items)} items to {OUTPUT_JSON}")
    print("🚀 Frontend War Room is now synchronized with latest Cloud data.")

if __name__ == "__main__":
    export_to_json()
