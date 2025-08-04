---
---




# versions 

http 0.9: 1991, only get 

http 1.0: 1996, no cache, one req. per conn. get post head 200 404 500

## http1.1 - 1997 

persistent conns: keep-alive by default  
pipelining: send multiple reqs. w/o waiting  
range reqs. for partial content     
chunked transfer encoding   

- can't reuse a single connection (no multiplexing)
- blocking requests 

compression: gzip, deflate 

Conditional requests (If-None-Match, If-Modified-Since)

2. cache-control header 
same headers sent with each request

3. put delete options trace connect 

websockets: full-duplex comm. over single TCP conn. `upgrade: websocket` 

## http2 - 2015 

binary protocol, http/2 frame = length, type, flags, stream id, payload

multiplex streams on a single conn. 
- parallel streams on single conn. 
- each stream has an id, interleaved on a single conn.
- stream prioritization 
blocking: packet loss still blocks all streams on tcp level

server-send 

header compression HPACK

https must 


## http3 - 2022

QUIC on UDP. Rebuilds tcp feats. in L7. TLS 1.3 is built-in 

Solves blocking: packet loss affects only one stream. 

Network mobility: Survives ip changes, NAT changes, resumes using conn. id 

single RTT vs 3 RTT http2 (TCP + TLS + HTTP)