---
---
L7 app
L4 transport - TCP, UDP, segment
L3 internet IP, packet
L1, L2 network access layer, frame, bits


## ip 
DHCP auto ip assignment, lease based
DNS resolution: app → library → nsswitch.conf → /etc/hosts → DNS

/etc/services maps port numbers to service names
firewall, iptables

ipv4 32 bits
ipv6 128 bits, stateless, no dhcp needed

CIDR 10.23.2.0/24 = network/mask = freeze first 24 bits

private nets
10.0.0.0/8
192.168.0.0/16
172.16.0.0/12

NAT: share single public ip for internal network

ping
ip
netstat

## sockets
unix, ipv4, ipv6
stream
datagram

socket() -> bind() -> listen() -> accept()
read()
write()

send() a packet
1. add headers for tcp, ip, ethernet
2. firewall check, iptables rules
3. queue
4. driver sends
5. network card transmits

recv() a packet
1. network card gets data, creates interrupt
2. driver puts data in mem
3. kernel checks protocol headers
4. firewall, iptables
5. find app and copy into app buffer


## TLS
Transport layer security

process 1 -- encrypted socket -- process 2

1. handshake
2. key exchange: first asym. then sym. key
3. validate cert.
4. encrypt and sign all traffic with the shared secret key. AES n HMAC

## ssh (secure shell)
port 22