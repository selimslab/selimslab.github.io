---
---
```
parse
auth
rate limit: L4 firewall, L7 app 
  
cookies
  restrict to domain
  https 
  block js
  expire

certs
  CA signs that the site owns the private key for their public key 

CORS: cross-origin resource sharing, set allowed origins 

CSRF token, request forgery

XSS
  Content Security Policy: allow-list scripts and assets
  validate and encode inputs 
```
