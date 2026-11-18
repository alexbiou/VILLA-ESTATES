# Остановить старый процесс на 3000
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
Start-Sleep -Seconds 2

# Production build
Set-Location 'c:\Users\User\Desktop\villa-estates'
npm run build > build-out.log 2> build-err.log

# Запуск npm start в фоне
Start-Process cmd -ArgumentList '/c npm start' -WorkingDirectory 'c:\Users\User\Desktop\villa-estates' -RedirectStandardOutput 'start-out.log' -RedirectStandardError 'start-err.log' -WindowStyle Hidden
Start-Sleep -Seconds 8

# Проверка порта 3000
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object LocalAddress, LocalPort, State, OwningProcess
