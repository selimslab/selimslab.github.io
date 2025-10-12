---
---
## http1.1 1997
default keep-alive

header Range: request specific byte ranges - server returns 206 partial content-range header
header Transfer-Encoding: chunked - stream dynamic content
can combine: server streams chunked responses for a range request

pipeline, can send multiple requests but the responses must arrive in order (head of line blocking)

## http2 2015
multiplex (interleave) streams on a single tcp connection
packet loss still blocks all streams on tcp level

binary
header compression HPACK

https
3 round trips (TCP + TLS + HTTP)

## http3 2022
QUIC on UDP
Rebuilds tcp feats. in L7
TLS built-in

single round trip

Solves blocking: packet loss affects only one stream

Network mobility: Survives ip changes, resumes using conn. id
