import React, { useState, useRef, useEffect } from "react";

/**
 * 標的搜尋輸入元件 (含 Autocomplete)
 */
export default function SearchInput({ symbols, onSelect, loading }) {
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef(null);

    // 過濾符合的標的
    const filtered = query
        ? symbols.filter(
            (s) =>
                s.symbol.includes(query.toUpperCase()) ||
                (s.name && s.name.toUpperCase().includes(query.toUpperCase()))
        )
        : symbols;

    // 點擊外部關閉
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (symbol) => {
        setQuery(symbol);
        setShowDropdown(false);
        onSelect(symbol);
    };

    return (
        <div className="mb-8 relative" ref={containerRef}>
            <label className="block text-xs font-medium text-slate-400 mb-2 ml-1">
                標的搜尋
            </label>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="輸入代號或名稱 (例: 2330)"
                    autoComplete="off"
                    spellCheck="false"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none mono font-medium"
                />
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                {loading && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <i className="fas fa-circle-notch fa-spin text-indigo-400"></i>
                    </div>
                )}
            </div>

            {/* Dropdown */}
            {showDropdown && query && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                    {filtered.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-slate-400 italic">
                            NO MATCH FOUND
                        </div>
                    ) : (
                        filtered.slice(0, 8).map((item) => (
                            <div
                                key={item.symbol}
                                onClick={() => handleSelect(item.symbol)}
                                className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b border-slate-50 last:border-none group transition-colors"
                            >
                                <div className="flex flex-col gap-0.5">
                                    <span className="mono text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
                                        {item.symbol}
                                    </span>
                                    <span className="text-xs font-medium text-slate-400">
                                        {item.name || "Unknown"}
                                    </span>
                                </div>
                                <i className="fas fa-chevron-right text-xs text-slate-200 group-hover:text-indigo-400 transition-colors"></i>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
