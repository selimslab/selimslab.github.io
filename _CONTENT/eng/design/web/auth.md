---
---
## methods
basic: base64(user, pass) over https

session-cookie

api key

bearer token: stateless eg. jwt, oauth

## oauth framework
grant 3rd parties limited access to a user account 
w/o sharing passwords

redirect to auth server
user logs in
user grants perms.
auth server redirects back with auth code
post auth code to get access and refresh tokens

oauth 2.0: access token + refresh token
OpenID Connect: built on Oauth 2.0, uses jwt

## JWT
base64(header, payload, signature)

header: encrypt. algo + token type
payload: claims eg. issuer, user id, expiration

server creates
client stores
server verifies signature and expiration

## SSO
single sign on
single token for many services
