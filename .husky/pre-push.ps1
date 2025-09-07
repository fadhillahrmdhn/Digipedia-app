Write-Host "Running build before push..."
bun run build
if ($LASTEXITCODE -ne 0) {
Write-Host "Build failed! Push aborted."
exit 1
}
Write-Host "Build OK. Proceeding to push."

exit 0