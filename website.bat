@echo off
cd /d "%~dp0"

:: Step 1 - Start the backend
start cmd /k ".\venv\Scripts\activate && uvicorn backend.main:app --reload"

:: Step 2 - Start the frontend
start cmd /k "npm run dev"
