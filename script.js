// 滾動動畫
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// 複製電子郵件功能
function copyEmail() {
  const email = "foreverbule2003@gmail.com";

  // 使用 Clipboard API
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        showMessage("電子郵件已複製到剪貼簿");
      })
      .catch(() => {
        // 如果 Clipboard API 失敗，使用傳統方法
        fallbackCopyEmail(email);
      });
  } else {
    // 如果不支援 Clipboard API，使用傳統方法
    fallbackCopyEmail(email);
  }
}

function fallbackCopyEmail(email) {
  const textArea = document.createElement("textarea");
  textArea.value = email;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    showMessage("電子郵件已複製到剪貼簿");
  } catch (err) {
    showMessage("複製失敗，請手動複製");
  }

  document.body.removeChild(textArea);
}

// 筆記功能
function toggleNoteForm() {
  const form = document.getElementById("noteForm");
  form.classList.toggle("active");

  if (form.classList.contains("active")) {
    document.getElementById("noteTitle").focus();
  } else {
    // 清空表單
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";
  }
}

function addNote() {
  const title = document.getElementById("noteTitle").value.trim();
  const content = document.getElementById("noteContent").value.trim();

  if (!title || !content) {
    alert("請填寫標題和內容！");
    return;
  }

  // 創建新筆記
  const noteItem = document.createElement("div");
  noteItem.className = "note-item";
  noteItem.style.opacity = "0";
  noteItem.style.transform = "translateY(-20px)";

  const today = new Date().toISOString().split("T")[0];

  noteItem.innerHTML = `
                <div class="note-date">${today}</div>
                <div class="note-title">${title}</div>
                <div class="note-content">${content}</div>
            `;

  // 插入到筆記容器的開頭
  const container = document.getElementById("notesContainer");
  container.insertBefore(noteItem, container.firstChild);

  // 動畫效果
  setTimeout(() => {
    noteItem.style.transition = "all 0.3s ease";
    noteItem.style.opacity = "1";
    noteItem.style.transform = "translateY(0)";
  }, 10);

  // 關閉表單
  toggleNoteForm();

  // 顯示成功訊息
  showMessage("筆記新增成功！");
}

function showMessage(text) {
  // 創建訊息元素
  const message = document.createElement("div");
  message.textContent = text;
  message.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 12px 24px;
                border-radius: 25px;
                font-weight: 600;
                z-index: 1000;
                opacity: 0;
                transform: translateY(-20px);
                transition: all 0.3s ease;
            `;

  document.body.appendChild(message);

  // 顯示動畫
  setTimeout(() => {
    message.style.opacity = "1";
    message.style.transform = "translateY(0)";
  }, 10);

  // 3秒後移除
  setTimeout(() => {
    message.style.opacity = "0";
    message.style.transform = "translateY(-20px)";
    setTimeout(() => {
      document.body.removeChild(message);
    }, 300);
  }, 3000);
}

// 鍵盤快捷鍵
document.addEventListener("keydown", function (e) {
  // Ctrl/Cmd + Enter 儲存筆記
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    const form = document.getElementById("noteForm");
    if (form.classList.contains("active")) {
      addNote();
    }
  }

  // Escape 關閉表單
  if (e.key === "Escape") {
    const form = document.getElementById("noteForm");
    if (form.classList.contains("active")) {
      toggleNoteForm();
    }
  }
});
