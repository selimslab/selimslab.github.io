---
title: Cross-site request forgery  
tags: sec

---

CSRF is forgery of a valid request.

It is possible to forge a fake request if 
1. the only mechanism to track user session is a cookie,
2. all request parameters predictable

To prevent it, we need at least one unpredictable parameter, a CSRF token. 

This token is a large random value, unique per user & per user session. 

Make sure your forms have CSRF tokens. 

<hr>

CSRF tokens should not be sent within cookies. 

Use `SameSite` header to forbid sending the cookie via cross-origin requests 

[more on CSRF](https://portswigger.net/web-security/csrf)