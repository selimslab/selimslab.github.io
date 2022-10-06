---
---

They are mainly used for managing sessions, tracking, and personalization

Prepend with `__Host-` to restrict cookie on a specific domain (no subdomains)

Prepend cookies with `__Secure-` to prevent them from being overwritten.  

`__Host-` prefix is stricter than `__Secure`

`Expires` set an expiration 

`Secure` header make cookies HTTPS 

`HTTPOnly` header to prevent JavaScript access

`SameSite` to prevent sending the cookie via cross-origin requests

```js
document.cookie = "_Host-username=Jane; Secure; HttpOnly; Path=/; SameSite=Strict";
```