// 待讀清單入口:沿用 JOURNAL 的 Firebase Google 登入,登入後才載入 Apps Script 嵌入框。
// 這層只擋「沒登入的人看得到頁面」;清單資料本身由 Apps Script 限 Tim 的 Google 帳號才讀得到。
import {
  auth,
  googleProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "../../lib/firebase.js";

const gate = document.getElementById("gate");
const msg = document.getElementById("msg");
const loginBtn = document.getElementById("login");
const app = document.getElementById("app");

function showGate(text) {
  msg.textContent = text;
  loginBtn.hidden = false;
  gate.hidden = false;
  app.hidden = true;
}

function showApp() {
  if (!app.src) app.src = app.dataset.src;
  gate.hidden = true;
  app.hidden = false;
}

if (!auth) {
  msg.textContent = "登入功能沒設定好,打不開。";
} else {
  onAuthStateChanged(auth, (user) => {
    if (user) showApp();
    else showGate("登入後才看得到。");
  });
  loginBtn.addEventListener("click", async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login error:", error);
      showGate("登入失敗:" + error.message);
    }
  });
}
