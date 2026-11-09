@echo off
title Impressao de Pedidos - Grupo 4K
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js nao encontrado. Instale em https://nodejs.org e rode de novo. & pause & exit /b)
start "" http://localhost:3080
node servidor.js
pause
