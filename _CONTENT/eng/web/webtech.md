---
---
websocket: 2 way 1-tcp con.
  sse: server to client, event on message 
  webhook: server to server, register n call 
  webrtc: real time comm. direct p2p 
   

ws
webtransport quic

sse
webhook

webrtc

webaudio

webworkers
service workers

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


## websockets 2011
single TCP conn.
full-duplex comm.

header
upgrade: websocket

```js
const ws = new WebSocket('ws:..')

ws.send('hi')

ws.onmessage = (event) => process(event)

```


## webhook
server to server
register n call

```js
POST https://yoursite.com/webhook

app.post('/webhook', process(req.event))

```

## SSE
server to client

```js
const source = new EventSource('/live-feed')

source.onmessage = (event) => process(event)
```


## webrtc
web real time comm.

p2p, real-time, secure, direct comm. of audio, video, data bw browsers and apps

peers connect using signaling servers, then talk directly

```js
const conn = new RTCPeerConnection();

const chan = conn.createDataChannel('chat');

// create offer
// send offer to remote peer via signaling server

// connect and talk
```
