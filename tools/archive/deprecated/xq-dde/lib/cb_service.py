import firebase_admin
from firebase_admin import credentials, firestore
import os

class CBService:
    """
    可轉債業務邏輯服務
    負責處理與 Firestore (cb_history) 的數據交互。
    """
    def __init__(self, service_account_path):
        self.db = self._init_firebase(service_account_path)

    def _init_firebase(self, path):
        if not firebase_admin._apps:
            cred = credentials.Certificate(path)
            firebase_admin.initialize_app(cred)
        return firestore.client()

    def get_tracked_items(self):
        """
        從 Firestore 獲取所有追蹤中的 CB 標的。
        """
        docs = self.db.collection('cb_history').stream()
        return [doc.to_dict() | {'id': doc.id} for doc in docs]

    def update_market_data(self, code, data):
        """
        更新特定標的的行情數據。
        """
        ref = self.db.collection('cb_history').document(code)
        data['updatedAt'] = firestore.SERVER_TIMESTAMP
        ref.set(data, merge=True)

    def batch_update_market_data(self, updates):
        """
        批次更新行情數據以優化效能。
        """
        batch = self.db.batch()
        for code, data in updates.items():
            ref = self.db.collection('cb_history').document(code)
            data['updatedAt'] = firestore.SERVER_TIMESTAMP
            batch.set(ref, data, merge=True)
        batch.commit()
