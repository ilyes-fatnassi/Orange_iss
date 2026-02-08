$file = 'auth.controller.ts'
$content = Get-Content $file -Raw
$content = $content -replace "`r`n", "`n"
[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host "Fixed: $file"
