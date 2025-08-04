---
---
## layers 

app - transport - internet - phys 

L7 App

L4 Transport TCP, UDP, segment

L3 Internet IP, packet

L1, L2 network access layer, frame, bits

## IP

ipv4 32 bits 

ipv6 128 bits, stateless, no dhcp needed

cidr 10.23.2.0/24 = network/mask = freeze first 24 bits

private nets 10.0.0.0/8, 192.168.0.0/16, 172.16.0.0/12

## cmds 

ping
ip: config
netstat: connections 
host, sysctl 

DHCP auto ip assignment, lease based 

dns resolution: app → library → nsswitch.conf → /etc/hosts → DNS

/etc/services maps port numbers to service names

firewall, iptables

NAT: share single public ip for internal network 

## sockets 

unix, ipv4, ipv6 sockets 

stream vs datagram sockets like tcp vs udp 

socket() -> bind() -> listen() -> accept()

read() write()  


## send()
send a packet
1. app calls send()
2. add headers, tcp, ip, ethernet 
3. firewalls, iptables 
4. q for sending 
5. driver sends, network card transmits 

## recv()
receive a packet
1. network card get data, creates interrupt 
2. driver puts data in mem 
3. kernel checks protocol headers
4. firewall, iptables 
5. find app and copy into app buffer 
