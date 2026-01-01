---
---
Key troubleshooting pattern
 1. Physical layer working? (ip link, interface UP?)
 2. IP configured? (ip address show)
 3. Can reach gateway? (ping gateway)
 4. Routing correct? (ip route show)
 5. DNS working? (host google.com)
 
 Diagnostic Tools:
 - lsof -i - shows processes using network ports
 - tcpdump - captures raw packets (protocol analysis)
 - netcat - flexible TCP/UDP client/server for testing
 - nmap - scans ports to discover services

## tools
ping
ip
netstat

## ip
ipv4 32 bits
ipv6 128 bits

DNS

DHCP: lease ip

/etc/services: maps port numbers to service names

iptables: firewall rules

NAT: share single public ip for internal network

## TLS
Transport layer security

process 1 -- encrypted socket -- process 2

handshake
key exchange: first asym. then sym. key
validate cert.
encrypt and sign (AES n HMAC) all traffic with the shared secret key

## ssh
secure shell
port 22


## layers
L7
app

L4
transport
TCP, UDP
segment

L3
internet
IP
packet

L1, L2
network access
frame
bits


## sockets

unix
ipv4
ipv6

stream
datagram

```
socket()
bind()
listen()
accept()

read()
write()

send()
recv()
```
