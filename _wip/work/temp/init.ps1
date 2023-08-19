# init the CXP-Main project and return back to the working directory
(pwd).Path | Set-Clipboard
cd C:\CXP-Main 
.\init.ps1 
Get-Clipboard | cd
