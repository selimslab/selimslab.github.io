---
title:  Cross-origin Resource Sharing (CORS)
tags: sec

---

an origin is a tuple of protocol:host:port

`Access-Control-Allow-Origin: https://x.com:8081`  only the specified origin can access  

`Access-Control-Allow-Origin: *` every origin can access

By default, browser XMLHttpRequest or fetch APIs allows same-origin only 

Use `Access-Control-Allow-Origin` to manage CORS 

Use `integrity` to verify a resource is not modified on the way

Use `X-Frame-Options: DENY` to disallow allow attempts to iframe site 

[more on CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
)