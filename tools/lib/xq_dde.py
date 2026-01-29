import os

try:
    import win32ui
    import dde
    DDE_AVAILABLE = True
except ImportError:
    DDE_AVAILABLE = False

class XQDDEClient:
    """
    XQ DDE 通訊客戶端抽象類別
    負責管理與 XQ 軟體的連線、請求發送與資源清理。
    """
    def __init__(self, service='XQLITE', topic='Quote'):
        self.service = service
        self.topic = topic
        self.server = None
        self.conversation = None
        self.connected = False
        
        if DDE_AVAILABLE:
            self.server = dde.CreateServer()
            self.server.Create("XQClient")
            self.conversation = dde.CreateConversation(self.server)

    def connect(self):
        if not DDE_AVAILABLE:
            print("[DDE] Error: DDE libraries (pywin32) not available.")
            return False
        try:
            self.conversation.ConnectTo(self.service, self.topic)
            self.connected = True
            return True
        except Exception as e:
            print(f"[DDE] Connection to {self.service}|{self.topic} failed: {e}")
            self.connected = False
            return False

    def request(self, query, silent=True):
        """
        發送 DDE 請求並回傳清洗後的字串。
        """
        if not self.connected:
            if not self.connect():
                return None
        
        try:
            res = self.conversation.Request(query)
            if res:
                # 清除 DDE 常見的 null bytes
                return res.replace('\x00', '').strip()
            return None
        except Exception as e:
            if not silent:
                print(f"[DDE] Request Error ({query}): {e}")
            return None

    def close(self):
        if self.server:
            self.server.Shutdown()
            self.connected = False

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()
