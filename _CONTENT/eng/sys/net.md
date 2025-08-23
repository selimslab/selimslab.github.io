---
---
L7 app
L4 transport - TCP, UDP, segment
L3 internet IP, packet
L1, L2 network access layer, frame, bits

## ip
ipv4 32 bits
ipv6 128 bits, stateless, no dhcp needed

CIDR 10.23.2.0/24 = network/mask = freeze first 24 bits

private nets
10.0.0.0/8
192.168.0.0/16
172.16.0.0/12

DHCP auto ip assignment, lease based
DNS resolution: app → library → nsswitch.conf → /etc/hosts → DNS

/etc/services maps port numbers to service names
firewall, iptables

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
add headers for tcp, ip, ethernet
firewall check, iptables rules
queue
driver sends
network card transmits

recv() a packet
network card gets data, creates interrupt
driver puts data in mem
kernel checks protocol headers
firewall, iptables
find app and copy into app buffer


## TLS
Transport layer security
process 1 -- encrypted socket -- process 2

handshake
key exchange: first asym. then sym. key
validate cert.
encrypt and sign all traffic with the shared secret key. AES n HMAC

## ssh
secure shell
port 22
