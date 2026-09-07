# Serve the static lab from this folder (not port 8000 — that is often another API).
Set-Location $PSScriptRoot
Write-Host "Lab: http://127.0.0.1:8766/index.html"
python -m http.server 8766
