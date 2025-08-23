---
---
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


