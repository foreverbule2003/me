// 待讀清單入口:沿用 JOURNAL 的 Firebase Google 登入,登入後才顯示 Apps Script 嵌入框。
// 嵌入框一打開就在背後載入(Apps Script 開機要幾秒),跟確認登入同時進行。
// 綠底一直擋到「登入確認完」且「清單頁畫好」才淡出,中間不露出還沒畫好的白底。
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
const bar = document.getElementById("bar");
const barFill = bar.querySelector("span");

// 進度條走到 pct%,花 secs 秒;等清單那段時間長短不一,用長秒數慢慢爬,不會停住不動。
function setBar(pct, secs = 0.4) {
  barFill.style.transition = `width ${secs}s ease-out`;
  barFill.style.width = pct + "%";
  bar.setAttribute("aria-valuenow", String(pct));
}
requestAnimationFrame(() => setBar(10));

// 嵌入框裡的清單頁第一次畫完會 postMessage("inbox-ready");等到它才淡入。
// 不用嵌入框的 load 事件:它在 Google 外殼載完就發生,清單還沒畫,會露出白底。
let loaded = false;
let authed = false;
const LOAD_TIMEOUT = 12000; // 通知一直沒來(例如要先登入 Google)就照樣顯示,不讓人卡在綠底

function reveal() {
  if (!authed || !loaded) return;
  setBar(100, 0.25);
  setTimeout(() => {
    app.classList.add("ready");
    gate.classList.add("leaving");
  }, 250); // 讓進度條先跑滿再淡出
}

// 登入確認完:先跳到 45%,再用 8 秒慢慢爬到 90% 等清單。
function waitForList() {
  bar.hidden = false;
  setBar(45);
  setTimeout(() => {
    if (!loaded) setBar(90, 8);
  }, 400);
}

function markLoaded() {
  loaded = true;
  reveal();
}

window.addEventListener("message", (e) => {
  let host = "";
  try {
    host = new URL(e.origin).hostname;
  } catch (err) {
    return;
  }
  if (e.data === "inbox-ready" && host.endsWith(".googleusercontent.com")) {
    markLoaded();
  }
});
setTimeout(markLoaded, LOAD_TIMEOUT);

function showGate(text) {
  authed = false;
  bar.hidden = true;
  msg.textContent = text;
  loginBtn.hidden = false;
  gate.classList.remove("leaving");
  app.classList.remove("ready");
}

if (import.meta.env.DEV) {
  // npm run dev 不用登入,方便本機改版面;build 出去的正式版照樣要登入。
  authed = true;
  loginBtn.hidden = true;
  msg.textContent = "開發模式,不用登入。載入清單中…";
  waitForList();
  reveal();
} else if (!auth) {
  msg.textContent = "登入功能沒設定好,打不開。";
} else {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      showGate("登入後才看得到。");
      return;
    }
    authed = true;
    loginBtn.hidden = true;
    msg.textContent = "載入清單中…";
    waitForList();
    reveal();
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
