# Sockets: Introduction Summary

## Overview

Sockets are a method of Inter-Process Communication (IPC) that allow data exchange between applications, either on the same host or across networks. The sockets API first appeared in 4.2BSD (1983) and is now standardized in POSIX.1g/SUSv3.

## Socket Creation

```c
fd = socket(domain, type, protocol);
```

Creates a socket and returns a file descriptor. For applications in this book, protocol is always 0.

## Communication Domains

Sockets exist in communication domains that determine addressing format and communication range:

### UNIX Domain (AF_UNIX)
- **Communication**: Within kernel on same host
- **Address format**: Pathname
- **Address structure**: sockaddr_un
- **Use case**: Local IPC between applications

### IPv4 Domain (AF_INET) 
- **Communication**: Via IPv4 network between hosts
- **Address format**: 32-bit IPv4 address + 16-bit port number
- **Address structure**: sockaddr_in
- **Use case**: Network communication over IPv4

### IPv6 Domain (AF_INET6)
- **Communication**: Via IPv6 network between hosts  
- **Address format**: 128-bit IPv6 address + 16-bit port number
- **Address structure**: sockaddr_in6
- **Use case**: Network communication over IPv6 (successor to IPv4)

## Socket Types

### Stream Sockets (SOCK_STREAM)
- **Reliable delivery**: Yes - guaranteed intact transmission or failure notification
- **Message boundaries**: No - byte-stream like pipes
- **Connection-oriented**: Yes - operates in connected pairs
- **Bidirectional**: Yes - data flows both directions
- **Protocol**: TCP in Internet domain
- **Analogy**: Like bidirectional pipes but can work over networks

### Datagram Sockets (SOCK_DGRAM)  
- **Reliable delivery**: No - messages may be lost, duplicated, or reordered
- **Message boundaries**: Yes - preserved as discrete messages (datagrams)
- **Connection-oriented**: No - connectionless communication
- **Protocol**: UDP in Internet domain
- **Use case**: When message boundaries matter more than reliability

## Key System Calls

### Core Socket Operations
- **socket()**: Creates new socket
- **bind()**: Binds socket to address (typically servers)
- **listen()**: Allows stream socket to accept connections
- **accept()**: Accepts connection on listening stream socket
- **connect()**: Establishes connection to another socket

### I/O Operations
- Standard: read(), write()
- Socket-specific: send(), recv(), sendto(), recvfrom()
- Default behavior: Blocking
- Non-blocking: Enable O_NONBLOCK flag via fcntl()

## Important Concepts

### Connection-Oriented vs Connectionless
- **Stream sockets**: Must be connected to peer socket
- **Datagram sockets**: Can send/receive without establishing connection
- **Peer terminology**: Remote socket, application, or address at other end

### Addressing
- **Well-known address**: Server binds to known location for client discovery
- **AF vs PF constants**: AF (address family) and PF (protocol family) are synonymous in practice

### Implementation Notes
- Linux multiplexes socket calls through single socketcall() system call (except Alpha, IA-64)
- ioctl(fd, FIONREAD, &cnt) returns unread bytes available (Linux extension)

## Typical Client-Server Flow
1. Both applications create sockets
2. Server binds socket to well-known address
3. Server listens for connections (stream sockets)
4. Client connects to server address
5. Data exchange via I/O operations
6. Connection cleanup

## Further Study Areas
- UNIX domain sockets (Chapter 57)
- TCP/IP networking concepts (Chapter 58) 
- Internet domain sockets (Chapter 59)
- Server design patterns (Chapter 60)
- Advanced socket features (Chapter 61) 