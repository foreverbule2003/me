import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  db,
  auth,
  googleProvider,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  onSnapshot,
  serverTimestamp,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "../lib/firebase.js";

const MOODS = ["🤯", "💡", "🔥", "😅", "🤔", "✨", "🎉", "😤"];

const JournalCard = ({ entry, onView, onEdit, onDelete, canEdit }) => {
  const date = entry.createdAt?.toDate?.() || new Date();
  const dateStr = date.toLocaleDateString("zh-TW", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="journal-card" onClick={() => onView(entry)}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-lg">{entry.mood || "📝"}</span>
            <span className="font-bold text-sm truncate">
              {entry.title || "無標題"}
            </span>
          </div>
          <div className="text-xs opacity-70 mt-1">{dateStr}</div>
        </div>
        {canEdit && (
          <div className="flex gap-1">
            <button
              className="text-xs opacity-50 hover:opacity-100 px-2 py-1"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(entry);
              }}
              title="編輯"
            >
              ✎
            </button>
            <button
              className="text-xs opacity-50 hover:opacity-100 px-2 py-1 hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(entry.id);
              }}
              title="刪除"
            >
              ✕
            </button>
          </div>
        )}
      </div>
      {entry.tags?.length > 0 && (
        <div className="mt-1">
          {entry.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const JournalModal = ({ entry, onSave, onClose, mode }) => {
  const [title, setTitle] = useState(entry?.title || "");
  const [content, setContent] = useState(entry?.content || "");
  const [mood, setMood] = useState(entry?.mood || "💡");
  const [tags, setTags] = useState(entry?.tags?.join(", ") || "");
  const [codeSnippet, setCodeSnippet] = useState(entry?.codeSnippet || "");

  const handleSave = () => {
    onSave({
      id: entry?.id,
      title: title || "無標題",
      content,
      mood,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      codeSnippet,
    });
  };

  if (mode === "view" && entry) {
    return (
      <div className="journal-modal" onClick={onClose}>
        <div
          className="journal-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4 border-b-2 border-[#0f380f] pb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{entry.mood}</span>
              <h3 className="font-bold text-lg">{entry.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-xl font-bold hover:text-red-600 px-2"
            >
              ✕
            </button>
          </div>
          <div className="mb-6 whitespace-pre-wrap font-mono min-h-[100px] text-sm leading-relaxed">
            {entry.content}
          </div>
          {entry.tags && entry.tags.length > 0 && (
            <div className="mb-4">
              {entry.tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {entry.codeSnippet && (
            <div className="bg-gray-100 p-3 border-2 border-[#0f380f] font-mono text-xs overflow-x-auto mb-4 rounded">
              <pre>{entry.codeSnippet}</pre>
            </div>
          )}
          <div className="text-right text-xs opacity-50">
            {entry.createdAt?.toDate?.().toLocaleString("zh-TW") || ""}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="journal-modal" onClick={onClose}>
      <div
        className="journal-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-bold text-lg mb-4 border-b-2 border-[#0f380f] pb-2">
          {entry?.id ? "編輯日記" : "新增日記"}
        </h3>
        <input
          className="journal-input"
          placeholder="標題..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="mb-2">
          <label className="text-xs font-bold">心情：</label>
          <div className="flex flex-wrap gap-1 mt-1">
            {MOODS.map((m) => (
              <button
                key={m}
                className={`mood-btn ${mood === m ? "active" : ""}`}
                onClick={() => setMood(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <textarea
          className="journal-textarea"
          placeholder="今天學到了什麼？有什麼想法？"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="journal-input"
          placeholder="標籤 (逗號分隔，如: React, AI, 重構)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <textarea
          className="journal-textarea"
          style={{
            minHeight: "60px",
            fontFamily: "monospace",
            fontSize: "12px",
          }}
          placeholder="相關程式碼 (選填)"
          value={codeSnippet}
          onChange={(e) => setCodeSnippet(e.target.value)}
        />
        <div className="flex gap-2 mt-4">
          <button className="gb-btn flex-1 text-center" onClick={handleSave}>
            💾 儲存
          </button>
          <button
            className="gb-btn flex-1 text-center opacity-70"
            onClick={onClose}
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

const JournalView = ({ onSetActions, onLoadState }) => {
  const [entries, setEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "journal_entries"),
      orderBy("createdAt", "desc"),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEntries(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login error:", error);
      alert("登入失敗：" + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSave = async (data) => {
    try {
      // Sanitize data to ensure no undefined values
      const payload = {
        title: data.title || "無標題",
        content: data.content || "",
        mood: data.mood || "💡",
        tags: Array.isArray(data.tags) ? data.tags : [],
        codeSnippet: data.codeSnippet || "",
        updatedAt: serverTimestamp(),
      };

      console.log("Saving entry:", { id: data.id, payload });

      if (data.id) {
        await updateDoc(doc(db, "journal_entries", data.id), payload);
      } else {
        // Explicitly reconstruct object for addDoc
        await addDoc(collection(db, "journal_entries"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }
      setIsModalOpen(false);
      setEditingEntry(null);
    } catch (error) {
      console.error("Error saving entry:", error);
      alert("儲存失敗：" + (error.message || "未知錯誤"));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("確定要刪除這篇日記嗎？")) return;
    try {
      await deleteDoc(doc(db, "journal_entries", id));
    } catch (error) {
      console.error("Error deleting entry:", error);
      alert("刪除失敗");
    }
  };

  const handleBack = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setEditingEntry(null);
    } else {
      navigate("/");
    }
  };

  const openCreate = () => {
    setEditingEntry(null);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  useEffect(() => {
    onSetActions({
      onBack: handleBack,
      onStart: () => {
        if (!isModalOpen && user) openCreate();
      },
      onSelect: () => {},
      onUp: () => {},
      onDown: () => {},
    });
  }, [isModalOpen, user, navigate, onSetActions]);

  // Lift loading state up
  useEffect(() => {
    onLoadState(isLoading);
  }, [isLoading, onLoadState]);

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-end border-b-4 border-[#0f380f] pb-2 mb-4">
        <div>
          <h1 className="text-2xl font-bold">TimZ</h1>
          <p className="text-sm">STATUS: ONLINE</p>
        </div>
        <div className="flex items-center gap-2">
          {authLoading ? null : user ? (
            <>
              <button className="gb-btn text-sm px-3" onClick={openCreate}>
                + NEW
              </button>
              <button className="login-btn" onClick={handleLogout}>
                登出
              </button>
            </>
          ) : (
            <button className="login-btn" onClick={handleLogin}>
              登入
            </button>
          )}
        </div>
      </div>

      {/* Page Title */}
      <div className="border-b-4 border-[#0f380f] pb-1 mb-4 flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold">JOURNAL</h2>
          <p className="text-xs">
            {user
              ? `Hi, ${user.displayName?.split(" ")[0] || "User"}`
              : "Vibe Coding Diary"}
          </p>
        </div>
      </div>

      <div
        className="flex-grow overflow-y-auto pr-1"
        style={{ maxHeight: "200px" }}
      >
        {entries.length === 0 ? (
          <div className="text-center py-4 text-sm opacity-70">
            還沒有任何日記
            <br />
            {user ? "點擊 +NEW 開始記錄！" : "登入後即可新增"}
          </div>
        ) : (
          entries.map((entry) => (
            <JournalCard
              key={entry.id}
              entry={entry}
              onView={(e) => {
                setEditingEntry(e);
                setModalMode("view");
                setIsModalOpen(true);
              }}
              onEdit={(e) => {
                setEditingEntry(e);
                setModalMode("edit");
                setIsModalOpen(true);
              }}
              onDelete={handleDelete}
              canEdit={!!user}
            />
          ))
        )}
      </div>

      <div onClick={handleBack} className="gb-btn menu-item mt-4">
        BACK
      </div>

      {isModalOpen && (
        <JournalModal
          entry={editingEntry}
          onSave={handleSave}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEntry(null);
          }}
          mode={modalMode}
        />
      )}
    </>
  );
};

export default JournalView;
