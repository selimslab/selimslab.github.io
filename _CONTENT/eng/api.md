---
---
```
filter page 
sort search 
version 

types, parse 
auth, rate-limit, cache
```

## docs
<https://diataxis.fr/>
ref
example
howto
tutorial

## http
```
1.1: 
  range
  chunked stream
  can pipeline requests but responses must arrive in order
http2: 
  interleave streams on single TCP
  packet loss blocks all streams
http3: 
  quic on UDP, solves stream blocking
  TLS built-in, single RTT
  mobile: survives IP changes

https: 3 RTT, TCP + TLS + HTTP
```

## services
```
rest 
  standard HTTP features
  stateless requests
  resources

  crud, public apis 

rpc 
  binary 
  type safety 
  proto versioning 

  custom caching 
  custom metrics 

  microservices, streaming 
  
gql 
  arbitrary data
  dynamic nesting 

  harder to secure, cache, rate-limit
  hard to predict query complexity 
    
  data loader batch to prevent n+1 
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


## webtech
```
websocket: 2 way, single-tcp, upgrade
quic webtransport 

sse: server to client, EventSource onmessage 

webhook: server to server, register n call 

webrtc: real-time, p2p, direct
  peers connect using signaling servers

webaudio

webgl, webgpu
wasm

indexeddb, webstorage, cache, filesys

geolocation, sensors, payments

service workers
```