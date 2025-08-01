---
---
## auth methods 

basic: base64(user:pass) over https, in every req.

bearer: token (jwt, oauth), stateless

api key: a static identifier, sent via custom header like x-api-key or query param ?apikey

oauth 2.0: access token + refresh token

session-based: cookie with session id, server side session storage 

## jwt 

base64(header, payload, signature)

header: algorithm(HMAC, RSA like HS256, RS256) and token type 
payload: claims like user id, expiration, issuer

1. user logs in, server creates jwt 
2. client stores jwt 
3. server verifies signature and expiration

## oauth 

an auth framework

grant 3rd parties limited access to user account w/o sharing passwords 

1. app redirects to auth server (google, github, spotify etc.)
2. user logs in and grants perms. 
3. auth server redirects back with auth code
4. app posts code, gets access token and refresh token 
5. app uses token for api calls 