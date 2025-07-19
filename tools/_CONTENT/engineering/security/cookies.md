---
---

Pieces of data stored on a browser, for managing sessions(keeping you logged in), tracking, personalization

Prefixes
- `__Secure-` prevents cookie from being overwritten.  
- `__Host-` restricts cookie on a specific domain (no subdomains)

Headers
- `Expires` - sets cookie expiration date
- `Secure` - requires HTTPS connection
- `HTTPOnly` - blocks JavaScript access
- `SameSite` - controls cross-origin cookie sharing

```js
document.cookie = "_Host-username=Jane; Secure; HttpOnly; Path=/; SameSite=Strict";
```