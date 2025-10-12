---
---
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
