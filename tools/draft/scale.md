# CS75 Lecture 9: Scalability

This lecture focuses on moving websites from single server to distributed systems that can handle more users.

## Web Hosting Options
- Shared hosting: Multiple customers on one machine
- VPS (Virtual Private Server): Your own VM on shared hardware
- Dedicated servers: Physical hardware exclusively for you

## Scaling Approaches
- **Vertical scaling**: Add more resources (CPU, RAM, disk) to a single machine
  - Limited by hardware constraints and cost
- **Horizontal scaling**: Add more machines
  - Requires load distribution across servers

## Load Balancing Methods
- **DNS Round Robin**: Return different IP addresses for each DNS request
  - Simple but doesn't account for server load
  - DNS caching can lead to uneven distribution
- **Hardware/Software Load Balancers**: Specialized devices or software that distribute requests
  - Can use various algorithms (round robin, least connections, server health)
  - Examples: Amazon ELB, HAProxy, Linux Virtual Server, hardware from F5/Cisco

## Session Handling in Distributed Systems
- **Problem**: Sessions stored on individual servers break when requests go to different servers
- **Solutions**:
  - Shared storage for sessions (NFS, database)
  - Sticky sessions via load balancer (cookie-based routing)
  - Store session data in cookies (limited size)

## Database Scaling
- **Replication**: Master-slave setup 
  - Master handles writes, slaves handle reads
  - Improves read performance and provides redundancy
- **Master-Master replication**: Two active database servers
  - Either can handle reads/writes
  - Provides redundancy for both read/write operations
- **Partitioning/Sharding**: Splitting data across multiple servers
  - Can distribute by user attributes (e.g., last name A-M on one server, N-Z on another)

## Performance Optimization
- **Caching**:
  - File-based: Generate HTML once, serve as static files (like Craigslist)
  - MySQL query cache: Cache query results
  - memcached: In-memory key-value store for frequently accessed data
- **PHP Acceleration**: APC, XCache, eAccelerator
  - Caches compiled PHP code to avoid repeated parsing

## High Availability
- Redundant components at every level
- RAID for disk redundancy
- Multiple availability zones/data centers
- Firewall configuration to limit access

## Architecture Best Practices
- Eliminate single points of failure
- Use multiple network switches
- Implement proper firewall rules (only necessary ports)
- Consider geographic distribution
