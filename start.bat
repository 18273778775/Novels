@echo off
title Novel Editor System - Startup Script

echo.
echo ========================================
echo    Novel Editor System
echo    Starting development server...
echo ========================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not detected, please install Node.js first
    echo Download: https://nodejs.org/
    pause
    exit /b 1
)

:: Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not available, please check Node.js installation
    pause
    exit /b 1
)

:: Check if package.json exists
if not exist "package.json" (
    echo [ERROR] package.json file not found
    echo Please make sure to run this script in the project root directory
    pause
    exit /b 1
)

:: Check if dependencies are installed
if not exist "node_modules" (
    echo [INFO] First run detected, installing dependencies...
    echo.
    npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo.
    echo [SUCCESS] Dependencies installed successfully
    echo.
)

:: Start development server
echo [INFO] Starting Next.js development server...
echo.

:: Start development server and open browser after 5 seconds
start /b cmd /c "timeout /t 5 /nobreak >nul && start http://localhost:3000"

:: Run development server (this will block until user presses Ctrl+C)
npm run dev

echo.
echo [INFO] Development server stopped
