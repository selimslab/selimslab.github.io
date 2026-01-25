---
---
## layers
```
L7 app
    HTTP, SMTP 
    DNS, DHCP UDP
    ssh  

TLS: Transport layer security
    verify certs 
    encrypt app data before passing to tcp/udp

L4 transport
    TCP: segments, byte-stream 
    UDP: IP datagrams + port + checksum

L3 internet
    IP packets
    ipv4 ipv6 32 vs 128 bits 

L1, L2 network access
    frames & bits
```

## tools
```
host 
ping 
ip
    route show
    address show
    link


tcpdump

netcat 
netstat

lsof -i
```

