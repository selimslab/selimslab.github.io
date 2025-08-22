---
---
## http1.0 1996
get post head
200 404 500

one req. per conn.
no cache

## http1.1 1997
default keep-alive

pipeline
can't reuse a single connection (no multiplexing)
blocking 

range
chunked transfer encoding

conditional headers
cache-control header

put delete options trace connect

## websockets 2011
full-duplex comm. over single TCP conn. 
`upgrade: websocket`

## http2 2015
multiplex streams on a single conn: each has an id
packet loss still blocks all streams on tcp level

binary protocol
http/2 frame:
length
type
flags
stream id
payload

server-send

header compression HPACK

https must

3 round trips (TCP + TLS + HTTP)

## http3 2022
QUIC on UDP
Rebuilds tcp feats. in L7
TLS built-in

single round trip

Solves blocking: packet loss affects only one stream.

Network mobility: Survives ip changes, resumes using conn. id
