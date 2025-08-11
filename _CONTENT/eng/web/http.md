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
range
chunked transfer encoding
compression
conditionals
cache-control header
put delete options trace connect

- can't reuse a single connection (no multiplexing)
- blocking pipeline

## websockets 2011
full-duplex comm. over single TCP conn. `upgrade: websocket`

## http2 2015
binary protocol
http/2 frame = length, type, flags, stream id, payload

multiplex streams on a single conn: each has an id
- blocking: packet loss still blocks all streams on tcp level

server-send
header compression HPACK

https must
3 round trips (TCP + TLS + HTTP)

## http3 2022
QUIC on UDP
Rebuilds tcp feats. in L7
TLS 1.3 is built-in
single round trip

Solves blocking: packet loss affects only one stream.
Network mobility: Survives ip changes, resumes using conn. id
