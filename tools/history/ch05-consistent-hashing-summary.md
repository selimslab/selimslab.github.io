# Chapter 5: Consistent Hashing Summary

## The Rehashing Problem

Traditional hash functions use: `serverIndex = hash(key) % N`

**Core Issue**: When servers are added or removed, most keys get redistributed to wrong servers, causing cache miss storms.

**Example**: 4 servers → 3 servers (server 1 fails)
- Almost all keys redistribute, not just those on failed server
- Massive cache misses across entire system

## Consistent Hashing Solution

**Definition**: Special hashing where only k/n keys need remapping when hash table resizes (k = keys, n = slots)

**Traditional vs Consistent**: 
- Traditional: Nearly all keys remap
- Consistent: Only fraction of keys remap

## Hash Space and Hash Ring

**Hash Space**: SHA-1 output range from 0 to 2^160 - 1
**Hash Ring**: Connect both ends of hash space to form circular structure

## Core Mechanism

1. **Hash Servers**: Map servers onto ring using server IP/name
2. **Hash Keys**: Map cache keys onto same ring
3. **Server Lookup**: Go clockwise from key position until first server found

**Key Redistribution**:
- **Add server**: Only keys between new server and previous server (anticlockwise) redistribute
- **Remove server**: Only keys on removed server redistribute to next server (clockwise)

## Two Major Issues

### 1. Uneven Partitions
- Servers can get very small or very large hash space portions
- Example: Removing s1 makes s2's partition twice as large as s0 and s3

### 2. Non-uniform Key Distribution  
- Most keys may cluster on one server while others remain empty
- Poor load balancing

## Virtual Nodes Solution

**Concept**: Each physical server represented by multiple virtual nodes on ring

**Benefits**:
- More balanced key distribution
- Smaller standard deviation with more virtual nodes
- 100 virtual nodes → 10% standard deviation
- 200 virtual nodes → 5% standard deviation

**Trade-off**: More virtual nodes = better balance but higher storage overhead

## Finding Affected Keys

**Server Addition**: 
- Affected range: from new server moving anticlockwise to next existing server
- Only keys in this range redistribute to new server

**Server Removal**:
- Affected range: from removed server moving anticlockwise to previous server  
- Keys redistribute to next server clockwise

## Benefits

1. **Minimal Redistribution**: Only fraction of keys move when servers change
2. **Horizontal Scaling**: Even data distribution enables easy scaling
3. **Hotspot Mitigation**: Distributes popular keys across multiple servers

## Real-World Usage

- **Amazon Dynamo**: Partitioning component
- **Apache Cassandra**: Data partitioning across clusters  
- **Discord**: Chat application scaling
- **Akamai**: Content delivery network
- **Google Maglev**: Network load balancer

## Key Insights

- Consistent hashing transforms server scaling from O(n) key redistribution to O(k/n)
- Virtual nodes are essential for production systems to achieve balanced distribution
- Standard deviation decreases as virtual node count increases, improving load balance
- Critical technique for any distributed system requiring horizontal scaling 