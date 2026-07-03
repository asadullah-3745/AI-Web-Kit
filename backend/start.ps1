Set-Location $PSScriptRoot

# Stop any previous instance on port 8000
$portPid = (Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess -Unique)
if ($portPid) {
  $portPid | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }
  Start-Sleep -Seconds 1
}

# 0.0.0.0 so phones on the same Wi-Fi can reach the API (Expo Go)
py -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
