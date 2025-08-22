---
---
## methods
basic: base64(user, pass) over https, in every req.
bearer: token (jwt, oauth), stateless
api key: a static id
oauth 2.0: access token + refresh token
session-based: cookie with session id, server side session storage

## jwt
base64(header, payload, signature)

header: algorithm(HMAC, RSA like HS256, RS256) and token type
payload: claims like user id, expiration, issuer

server creates
client stores
server verifies signature and expiration


## oauth framework
grant 3rd parties limited access to a user account w/o sharing passwords

1. redirect to auth server (google, github, spotify etc.)
2. user logs in and grants perms.
3. auth server redirects back with auth code
4. post auth code to get access and refresh tokens

## OpenID Connect
built on Oauth 2.0, uses jwt

## SSO
single sign on
get a token from an id provider, use it for many services
