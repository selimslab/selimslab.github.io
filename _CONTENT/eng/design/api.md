---
---
https://thecopenhagenbook.com/sessions

```
api/v1/people/123/ideas

sort 
search

filter 
page: offset/limit or cursor 

idempotency

http
  1.1: 
    range
    chunked stream
    can pipeline multiple requests but responses must arrive in order
  http2: 
    interleave streams on single TCP
    packet loss blocks all streams
  https: 3 RTT: TCP + TLS + HTTP
  http3: 
    quic on UDP
    rebuild tcp feats in L7, solves stream blocking
    TLS built-in, single RTT
    conn. survives IP changes
rest 
  http 
  webtech 
  crud, public apis 
  standard HTTP features
  stateless requests
  resources
    
rpc 
  binary 
  perf
  type safety 
  proto versioning 
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


webtech 
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

  webworkers
  service workers


auth 
  basic: base64(user, pass) over https
  apikey: static, server to server 
  session token: db lookup 
  bearer token: stateless eg. jwt, oauth

  jwt: base64(header, payload,sign)
    header: encrypt. algo + token type
    payload: claims eg. issuer, user id, expiration
    access + refresh tokens 
    secure cookie
    server creates, client stores, server verifies signature and expiration

  oauth: grant 3rd parties limited access to a user account w/o sharing passwords
    redirect -> auth code -> jwt 
  
  SSO: single sign on


sec 
  validate
  auth
  CORS: allowed origins 
  CSRF token 
  cookies: 
    you can restrict them to a domain
    expire
    require https
    block js access, etc.
  XSS: 
    Allow-list scripts and assets in `Content Security Policy` header
    validate and encode inputs 
  certs: a CA signs that the site owns the private key for their public key 
  rate limit 
    l4 firewall
    l7 app 


```