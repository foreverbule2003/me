# Firebase Authentication 整合除錯總結

本文檔記錄了將 Firebase Google Sign-In 整合至 GitHub Pages (Journal 功能) 時遇到的問題、原因分析及最終解決方案。

## 1. 問題歷程

在實作過程中，我們遇到了數個層層遞進的安全性與配置錯誤：

### 第一階段：API Key 限制 (HTTP Referrer)
*   **現象**：在本地 `localhost` 測試時，Firebase SDK 初始化報錯或無法連線。
*   **原因**：Firebase API Key 設定了 HTTP Referrer 限制，但未包含測試環境 IP 或 `localhost`.
*   **解決**：在 Google Cloud Console 將 `localhost` 和 `127.0.0.1` 加入 API Key 的允許清單。

### 第二階段：多重 API Key 混淆
*   **現象**：修改設定後無效，且 Console 中顯示兩個 API Key。
*   **原因**：Firebase 在啟用 Auth 時自動建立了第二個 Key。程式碼中使用的是舊的、有限制的 Key，而我們調整設定的是新的 Key（或反之）。
*   **解決**：統一使用同一個 API Key，並刪除多餘的 Key 以免混淆。

### 第三階段：未授權的網域 (Authorized Domains)
*   **現象**：部署到 GitHub Pages 後，出現 `auth/unauthorized-domain` 錯誤。
*   **原因**：Firebase Auth 預設只允許 `localhost` 和 `firebaseapp.com`，不允許 `github.io`。
*   **解決**：在 Firebase Console > Authentication > Settings > Authorized domains 中新增 `foreverbule2003.github.io`。

### 第四階段：OAuth 設定 (JavaScript Origins)
*   **現象**：點擊登入後，Google 跳出 `The requested action is invalid` 或 400 錯誤。
*   **原因**：Google Cloud OAuth 用戶端 (Client ID) 的「已授權 JavaScript 來源」未包含 GitHub Pages 網域。
*   **解決**：在 Google Cloud Console > OAuth 用戶端中，將 `https://foreverbule2003.github.io` 加入來源。

### 第五階段：彈出視窗與 Handler 網域 (The Final Boss)
*   **現象**：
    1. 彈出視窗顯示 `The requested action is invalid` (API Key 阻擋)。
    2. 修復後顯示 `redirect_uri_mismatch` (OAuth 阻擋)。
*   **核心原因 (關鍵)**：
    使用 `signInWithPopup` 時，Firebase SDK 會開啟一個位於 `<app-id>.firebaseapp.com/__/auth/handler` 的彈出視窗來處理與 Google 的安全溝通。
    *   **API Key 錯誤**：我們的 API Key 只允許了 `github.io`，**沒有允許 `firebaseapp.com`**，導致彈出視窗內的 Firebase script 無法運作。
    *   **OAuth 錯誤**：Google OAuth 認為 `<app-id>.firebaseapp.com` 發起的驗證請求不合法，因為它不在「已授權的重新導向 URI」清單中。

## 2. 最終解決方案

為了讓功能在 GitHub Pages 上正常運作，必須同時滿足以下所有條件：

1.  **Firebase Auth 設定**：
    *   `authDomain` 維持預設的 `my-landing-page-2ca68.firebaseapp.com` (不要改成 github.io)。
    *   Authorized domains 包含 `foreverbule2003.github.io`。

2.  **API Key 安全性設定 (Google Cloud Credentials)**：
    *   必須允許 **來源網站**：`https://foreverbule2003.github.io/*`
    *   必須允許 **Handler 網站**：`https://my-landing-page-2ca68.firebaseapp.com/*` (這是 `signInWithPopup` 的運作關鍵)。

3.  **OAuth 2.0 Client ID 設定 (Google Cloud Credentials)**：
    *   **JavaScript 來源**：包含 `https://foreverbule2003.github.io`
    *   **重新導向 URI**：包含 `https://my-landing-page-2ca68.firebaseapp.com/__/auth/handler`

## 3. 關鍵觀念

*   **`signInWithPopup` 的運作原理**：它不是直接從您的網站連到 Google，而是先開啟一個 Firebase 託管的中介頁面 (Handler)，由這個頁面去跟 Google 溝通。因此，任何安全性設定（API Key 或 OAuth）都必須同時「放行」您的網站 **以及** 這個 Firebase Handler 頁面。
