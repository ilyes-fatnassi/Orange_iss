$files = Get-ChildItem -Path . -Include *.ts -Recurse
foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw
  $content = $content -replace "`r`n", "`n"
  [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
  Write-Host "Fixed: $($file.FullName)"
}
