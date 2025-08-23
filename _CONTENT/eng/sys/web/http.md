---
---
## http1.0 1996
get post head
200 404 500

one req. per conn.
no cache 

## http1.1 1997
default keep-alive
cache-control header

range
chunked transfer encoding

conditional headers

put delete

pipeline
blocking
can't reuse a single connection (no multiplexing) 

## http2 2015
multiplex streams on a single conn: each with a streamId
packet loss still blocks all streams on tcp level

binary protocol

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
