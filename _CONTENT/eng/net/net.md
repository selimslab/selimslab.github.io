---
---
L7 App

L4 Transport TCP, UDP, segment

L3 Internet IP, packet

L1, L2 network access layer, frame, bits


app - transport - internet - phys 

ipv4 32 bits 

ipv6 128 bits, stateless, no dhcp needed

cidr 10.23.2.0/24 = network/mask = freeze first 24 bits

private nets 10.0.0.0/8, 192.168.0.0/16, 172.16.0.0/12

cmds 

ping
ip: config
netstat: connections 
host, sysctl 

DHCP auto ip assignment, lease based 

dns resolution: app → library → nsswitch.conf → /etc/hosts → DNS

/etc/services maps port numbers to service names

firewall, iptables

NAT: share single public ip for internal network 