---
layout: post
title: Network Layers
tags: software     
category: Tech 
---

1. application
HTTP, FTP

2. Presentation
Encoding, encryption. Presents data to upper layer
ASCII, JPEG, HTML, MP3

3. session
establishes, manages and terminates connections


4. Transport (Segment)
TCP, UDP

5. Network (Packet)
IP

6. Data-link (Frame)
Error Detection and Control of Data
802.11, Ethernet

7. Physical (Binary)
Ethernet, USB, Bluetooth

---

in other words 

USB-> ethernet -> IP -> TCP, UDP -> RPC  -> TLS  -> http, smtp, ftp, soap, ssh

---

yet another 

App, http

Presentation, jpeg

Session 

Transport, tcp

Network, ip

Data link, ethernet

Physical, usb