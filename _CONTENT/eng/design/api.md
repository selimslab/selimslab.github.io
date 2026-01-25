---
---
```
filter
page
  offset/limit
  cursor 

sort 
search

version 
cache 

perf
type safety 

auth 
secure 
rate-limit 
```

## http
```
1.1: 
  range
  chunked stream
  can pipeline multiple requests but responses must arrive in order
http2: 
  interleave streams on single TCP
  packet loss blocks all streams
http3: 
  quic on UDP
  rebuild tcp feats in L7, solves stream blocking
  TLS built-in, single RTT
  conn. survives IP changes

https: 3 RTT, TCP + TLS + HTTP
```

## services
```
rest 
  standard HTTP features
  stateless requests
  resources

  crud, public apis 

  api/v1/people/123/ideas


rpc 
  binary 
  type safety 
  proto versioning 
  perf

  custom caching 
  custom metrics 

  microservices, streaming 
  
gql 
  arbitrary data
  dynamic nesting 

  harder to:
    secure
    rate limit
    cache
    predict query complexity 

  query caching 
  n+1 -> data loader batch 
  subscriptions

  mobile apps 
```


## auth
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

## websec
```
  parse
  auth

  cookies
    restrict to a domain
    https only 
    block js access
    expire

  CORS: cross-origin resource sharing, set allowed origins 

  XSS
    Allow-list scripts and assets in `Content Security Policy` header
    validate and encode inputs 

  CSRF token, request forgery

  certs
    CA signs that the site owns the private key for their public key 

  rate limit 
    l4 firewall
    l7 app 
```


## webtech
```
websocket: 2 way, single-tcp, upgrade: websocket
sse: server to client, EventSource onmessage 
webhook: server to server, register n call 
webrtc: 
  real-time comm, p2p, secure, direct.
  peers connect using signaling servers, then talk directly

webaudio
quic webtransport 

indexeddb
webstorage
cache api
filesys api

webgl
webgpu
wasm

geolocation
sensors
payments

service workers
```