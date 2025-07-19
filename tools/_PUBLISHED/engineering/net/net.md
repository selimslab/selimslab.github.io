---
title: Networks
---

```txt

OSI Model                            TCP/IP Model 
┌─────────────────────┐       ┌─────────────────────┐
│   7. Application    │       │                     │
├─────────────────────┤       │   Application       │
│   6. Presentation   │  ───► │   Layer             │
├─────────────────────┤       │       data          │
│   5. Session        │       │   (HTTP, DNS, SMTP) │
├─────────────────────┤       ├─────────────────────┤
│   4. Transport      │  ───► │   Transport Layer   │
│   (TCP/UDP) segment │       │   (TCP/UDP) segment │
├─────────────────────┤       ├─────────────────────┤
│   3. Network        │  ───► │   Internet Layer    │
│   (IP)     packet   │       │   (IP) packet       │
├─────────────────────┤       ├─────────────────────┤
│   2. Data Link      │       │                     │
│   (Ethernet) frame  │  ───► │   Network Access    │
├─────────────────────┤       │   Layer             │
│   1. Physical       │       │      frame/bits     │
│               bits  │       │   (Ethernet, WiFi)  │
└─────────────────────┘       └─────────────────────┘

```

app requests HTTP GET 

TCP adds port 80 and sequence numbers

IP adds source and destination ips 

access layer adds mac adresses and sends signals on cable
