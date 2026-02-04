import sys
from lib.xq_dde import XQDDEClient

def test_connection():
    print("=== XQ DDE Diagnostic Tool ===")
    
    # 1. Test Service Names
    services = ['XQLITE', 'XQ', 'XQENTERPRISE']
    topics = ['Quote', 'Price']
    
    connected_service = None
    connected_topic = None
    
    for service in services:
        for topic in topics:
            print(f"Testing connectivity to {service}|{topic}...", end=" ")
            try:
                with XQDDEClient(service=service, topic=topic) as dde:
                    if dde.connected:
                        print("SUCCESS! ✅")
                        connected_service = service
                        connected_topic = topic
                        break
                    else:
                        print("Failed.")
            except Exception as e:
                print(f"Error: {e}")
        if connected_service: break
    
    if not connected_service:
        print("\n❌ Could not connect to any XQ DDE Service.")
        print("Please ensure 'XQ Global Winner' is running and logged in.")
        return

    print(f"\nUsing confirmed connection: {connected_service}|{connected_topic}")

    # 2. Test Symbol Formats (Focus on CB)
    # 2. Test Symbol Formats (Focus on CB)
    # Target: High Volume CBs
    test_symbols = ['23683.TW', '62822.TW', '35831.TW']
    # Goal: Find "Yesterday Close" and verify "Current Price"
    fields = ['Price', 'CurPrice', 'DealPrice', 'RefPrice', 'ReferencePrice', 'Ref', 'PreClose', 'TotalVolume']
    
    with XQDDEClient(service=connected_service, topic=connected_topic) as dde:
        for sym in test_symbols:
            print(f"\nQuerying Symbol: [{sym}]")
            for field in fields:
                query = f"{sym}-{field}"
                val = dde.request(query)
                print(f"  Field '{field}': {val if val else 'No Data'}")

if __name__ == "__main__":
    test_connection()
