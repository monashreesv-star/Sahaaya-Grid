@echo off
title SAHAAYA GRID — Emergency Response Server
cd /d "%~dp0"
echo ========================================================
echo   Starting SAHAAYA GRID Emergency Platform...
echo ========================================================

REM Try standard node first, fallback to runtime path if not in PATH
where node >nul 2>nul
if %errorlevel% equ 0 (
    node server.js
) else (
    "C:\Users\praha\AppData\Local\OpenAI\Codex\runtimes\cua_node\84464046935436b8\bin\node.exe" server.js
)

pause
