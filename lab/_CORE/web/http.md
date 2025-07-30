---
---

http 0.9: 1991, only get 

## http 1.0 - 1996

one req. per conn. 

get post head - 200 404 500

no cache 

## http 1.1 - 1997 

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


## http 2 - 2015 

binary protocol, http/2 frame = length, type, flags, stream id, payload

multiplex streams on a single conn. 
- parallel streams on single conn. 
- each stream has an id, interleaved on a single conn. 
- blocking: packet loss blocks all streams
- stream prioritization

server-send 

header compression HPACK

https must 


## http 3 - 2022

quic is based on udp. 

It rebuilds tcp feats. in L7, like ordering, flow control, throttling, etc. 

more complex, uses more CPU, limited kernel optimizations but quick iteration 

tls 1.3 is built-in 

survives ip changes, resumes connection, good for mobile 

solves blocking, packet loss affects only one stream 


### tcp + tls setup 

3 RTT

1. connect
syn 
        syn-ack
ack


2. TLS  
c: hello 

s: cert

3. talk 
encrypted data <-->



### quic setup 

1 RTT or even 0 RTT if resume 

c: initial packet with tls handshake 

s: response with keys 

c: encrypted data 


## websockets 2011

full-duplex comm. over single TCP conn. 

upgrade from htt/1.1 using `upgrade: websocket` header

## CORS 2014 

cross origin resource sharing 

Access-Control-Allow-(origin-methods-headers)


## auth methods 

basic: base64(user:pass) over https, in every req.

bearer: token (jwt, oauth), stateless

api key: a static identifier, sent via custom header like x-api-key or query param ?apikey

oauth 2.0: access token + refresh token

session-based: cookie with session id, server side session storage 