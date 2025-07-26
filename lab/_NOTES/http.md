---
---

## http 0.9 - 1991

only get 

## http 1.0 1996 

get post head 

status codes 200 404 500 

content-type header 

no cache 

## http 1.1 1997 

keep-alive by default

stream response by chunks 

caching by cache-control header 

host header 

put delete options trace connect 

same headers sent with each request

can't reuse a single connection (no multiplexing)

blocking requests 

## http 2 - 2015 

binary protocol 

single connection multiplexing - multiple requests on single connection, in parallel 

server can send as well 

header compression 

http/2 frame = length, type, flags, stream id, payload

```
┌─────────────────┐
│   HTTP/2 Frame  │
├─────────────────┤
│ Length (24 bit) │
│ Type   (8 bit)  │
│ Flags  (8 bit)  │
│ Stream ID (31b) │
│ Payload         │
└─────────────────┘

```

almost all modern browsers and cdns support 

https mandatory 


## http 3 - 2022

quic is based on udp 
- rebuilds TCP mechanisms for reliability, order, flow control, congestion control etc. in application layer. It's more complex, uses more CPU, and limits kernel optimizations but enables iteration and innovation compared to kernel TCP


```
UDP Packet Structure:
┌─────────────────┐
│ UDP Header      │  8 bytes
├─────────────────┤
│ QUIC Packet     │  Variable
│ ┌─────────────┐ │
│ │ QUIC Header │ │  Connection ID, Packet Number
│ ├─────────────┤ │
│ │ QUIC Frames │ │  Stream data, ACKs, control
│ └─────────────┘ │
└─────────────────┘

```

tls 1.3 is built-in 

survives ip changes, resumes connection 

solves blocking, packet loss affects only one stream 

growing adoption


### tcp + tls setup 

client: syn

server: syn-ack 

client: ack 

client: hello (TLS)

server: hello + certificate

client: encrypted client data 

3 round trips 

### quic setup 

client: initial packet with tls handshake 

server: response with keys 

client: encrypted data 

1 RTT or 0 RTT if resume 


```js
const ishttp2 = window.fetch && 'ReadableStream' in window

const ishttp3 = 'serviceWorker' in navigator && 'http3' in navigator
```

