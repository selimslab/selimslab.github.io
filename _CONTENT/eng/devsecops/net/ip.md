---
---
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