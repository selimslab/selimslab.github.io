---
---
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
