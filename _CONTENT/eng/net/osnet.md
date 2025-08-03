---
---
## sockets 

unix, ipv4, ipv6 sockets 

stream vs datagram sockets like tcp vs udp 

socket() -> bind() -> listen() -> accept()

read() write()  

send() recv()


send a packet
1. app calls send()
2. add headers, tcp, ip, ethernet 
3. firewalls, iptables 
4. q for sending 
5. driver sends, network card transmits 

receive a packet
1. network card get data, creates interrupt 
2. driver puts data in mem 
3. kernel checks protocol headers
4. firewall, iptables 
5. find app and copy into app buffer 
