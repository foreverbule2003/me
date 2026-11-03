@echo off
chcp 65001
echo ==============================================
echo      Daily Hot CB Sync (XQ DDE)
echo ==============================================
echo.
echo Target: Fetching Hot CB Snapshots for War Room...
cd /d "%~dp0"

echo [1/2] Fetching from PChome (Legacy Crawler)...
call node tools/fetch-hot-cb.js --cloud

echo.
echo [2/2] Data Sync Complete.
echo.
timeout /t 5
