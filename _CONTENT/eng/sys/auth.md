---
---
``` 
types
  basic: base64 over tls 
  apikey: static, server to server 
  token: 
    session: db lookup 
    bearer: stateless, jwt, oauth

jwt
  base64
    header: encrypt. algo + token type
    payload: claims eg. issuer, user id, expiration
    sign

  access + refresh tokens 

  server creates
  client stores in secure cookie
  server verifies signature and expiration

oauth
  grant 3rd parties limited access
  w/o sharing passwords

  redirect -> auth code -> jwt 

SSO: single sign on
```
