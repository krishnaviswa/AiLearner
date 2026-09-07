# Serve this lab from THIS folder on 8766.
# Do not use port 8000 — that is often another API ({"detail":"Not Found"}).
# Do not start this script from a sibling repo.
Set-Location $PSScriptRoot
Write-Host "AI Engineering Lab (static course)"
Write-Host "Open: http://127.0.0.1:8766/index.html"
Write-Host "Port 8000 is left alone."
python -m http.server 8766 --bind 127.0.0.1
