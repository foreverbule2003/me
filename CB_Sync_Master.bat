@echo off
setlocal enabledelayedexpansion

echo ==========================================
echo 🚀 CB War Room - Master Sync starting...
echo ==========================================

:: 1. Run XQ Bridge to sync market data and name cleanup
echo ☁️ [1/2] Syncing Market Data from XQ DDE...
python tools/xq_bridge.py --meta

if %ERRORLEVEL% NEQ 0 (
    echo ❌ XQ Bridge failed. Please ensure XQ Global Winner is running and DDE is active.
    pause
    exit /b %ERRORLEVEL%
)

:: 2. Export Firestore data to frontend JSON
echo 📦 [2/2] Exporting to War Room JSON...
python tools/export_cb_json.py

if %ERRORLEVEL% NEQ 0 (
    echo ❌ JSON Export failed.
    pause
    exit /b %ERRORLEVEL%
)

echo ==========================================
echo ✅ Master Sync Complete!
echo 🌐 Your War Room is now updated.
echo ==========================================
:: pause
