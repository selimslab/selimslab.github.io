# Chapter 5: Design Consistent Hashing

## The Rehashing Problem

### Traditional Hash Method
**Formula**: `serverIndex = hash(key) % N`
- N = size of server pool
- Works well when server pool size is fixed

### Problem Example
**Initial setup**: 4 servers, 8 keys
- key0: hash % 4 = 1 → server 1
- key1: hash % 4 = 2 → server 2
- key2: hash % 4 = 3 → server 3
- key3: hash % 4 = 0 → server 0

**When server 1 goes offline**: Pool size becomes 3
- key0: hash % 3 = 0 → server 0 (moved)
- key1: hash % 3 = 2 → server 2 (moved)
- key2: hash % 3 = 0 → server 0 (moved)
- key3: hash % 3 = 0 → server 0 (unchanged)

**Result**: Most keys redistributed, causing cache miss storm

## Consistent Hashing Solution

### Definition
"Consistent hashing is a special kind of hashing such that when a hash table is re-sized and consistent hashing is used, only k/n keys need to be remapped on average, where k is the number of keys, and n is the number of slots."

### Key Advantage
- Traditional hashing: Nearly all keys remapped when servers change
- Consistent hashing: Only k/n keys need remapping

## Hash Space and Hash Ring

### Hash Space
- Uses SHA-1 hash function
- Output range: 0 to 2^160 - 1
- Hash space forms a continuum from 0 to 2^160 - 1

### Hash Ring
- Connect both ends of hash space to form a ring
- Circular structure where 2^160 - 1 connects back to 0

## Core Algorithm

### 1. Hash Servers
- Map servers onto ring using hash function
- Base on server IP or name
- Each server occupies a position on the ring

### 2. Hash Keys
- Map keys onto ring using same hash function
- No modular operation needed
- Keys distributed around the ring

### 3. Server Lookup
**Rule**: Go clockwise from key position until first server found
- key0 → server 0 (first server clockwise)
- key1 → server 1 (first server clockwise)
- key2 → server 2 (first server clockwise)
- key3 → server 3 (first server clockwise)

## Adding/Removing Servers

### Adding a Server
**Example**: Add server 4
- Only key0 needs redistribution
- key0 now routes to server 4 (first server clockwise)
- Other keys (k1, k2, k3) remain on same servers
- **Impact**: Minimal redistribution

### Removing a Server
**Example**: Remove server 1
- Only key1 needs redistribution
- key1 now routes to server 2 (next server clockwise)
- Other keys remain unaffected
- **Impact**: Minimal redistribution

## Problems with Basic Approach

### 1. Uneven Partition Sizes
**Definition**: Partition = hash space between adjacent servers
**Problem**: Server addition/removal creates uneven partitions
**Example**: If s1 removed, s2's partition becomes twice as large as s0 and s3's partitions

### 2. Non-Uniform Key Distribution
**Problem**: Keys may cluster on specific servers
**Example**: If servers map to adjacent positions
- Most keys stored on server 2
- Servers 1 and 3 have no data

## Virtual Nodes Solution

### Concept
- Each physical server represented by multiple virtual nodes
- Virtual nodes distributed around the ring
- Reduces partition size variance

### Implementation
**Example**: Server 0 has virtual nodes s0_0, s0_1, s0_2
- Each server responsible for multiple partitions
- Partitions labeled s0 managed by server 0
- Partitions labeled s1 managed by server 1

### Key Lookup with Virtual Nodes
1. Go clockwise from key position
2. Find first virtual node encountered
3. Virtual node maps to physical server
**Example**: k0 → s1_1 (virtual node) → server 1 (physical server)

### Benefits of Virtual Nodes
- **More balanced distribution**: As virtual nodes increase, key distribution becomes more even
- **Standard deviation improvement**: 
  - 100 virtual nodes: ~10% standard deviation
  - 200 virtual nodes: ~5% standard deviation
- **Trade-off**: More virtual nodes = more storage space needed

## Finding Affected Keys

### When Adding Server
**Process**: 
1. Start from newly added server position
2. Move anticlockwise until next server found
3. Keys in this range need redistribution

**Example**: Add server 4
- Affected range: s3 to s4 (anticlockwise)
- Keys between s3 and s4 redistribute to s4

### When Removing Server
**Process**:
1. Start from removed server position
2. Move anticlockwise until next server found
3. Keys in this range redistribute to next clockwise server

**Example**: Remove server 1
- Affected range: s0 to s1 (anticlockwise)
- Keys between s0 and s1 redistribute to s2

## Key Benefits

### 1. Minimized Redistribution
- Only fraction of keys need redistribution
- Most keys remain on same servers

### 2. Horizontal Scaling
- Easy to add/remove servers
- Data more evenly distributed

### 3. Hotspot Mitigation
- Prevents excessive access to specific shards
- Distributes popular data across servers
**Example**: Celebrity data (Katy Perry, Justin Bieber, Lady Gaga) won't all end up on same shard

## Real-World Applications

### Production Systems Using Consistent Hashing
- **Amazon Dynamo**: Partitioning component
- **Apache Cassandra**: Data partitioning across cluster
- **Discord**: Chat application scaling
- **Akamai**: Content delivery network
- **Google Maglev**: Network load balancer

## Algorithm Summary

### Traditional Hashing
```
serverIndex = hash(key) % N
```
- **Problem**: N changes → most keys redistributed
- **Cache miss ratio**: Very high during server changes

### Consistent Hashing
```
1. Map servers to ring using hash(server_id)
2. Map keys to ring using hash(key)
3. For each key, find first server clockwise
4. Use virtual nodes for better distribution
```
- **Redistribution**: Only k/n keys on average
- **Cache miss ratio**: Minimal during server changes

## Performance Characteristics

### Time Complexity
- **Key lookup**: O(log N) with binary search on sorted server list
- **Add/remove server**: O(K) where K is number of affected keys

### Space Complexity
- **Virtual nodes**: O(V × N) where V is virtual nodes per server
- **Key mappings**: O(K) where K is total number of keys

## Tuning Parameters

### Virtual Node Count
- **Few virtual nodes**: Uneven distribution, faster lookups
- **Many virtual nodes**: Better distribution, more memory usage
- **Typical range**: 100-200 virtual nodes per server
- **Decision factors**: Balance between distribution quality and memory usage

### Hash Function Choice
- **SHA-1**: Most common, good distribution
- **MD5**: Faster, slightly less secure
- **Requirements**: Uniform distribution, deterministic output

## Implementation Considerations

### Data Structure
- **Sorted list/array**: For efficient binary search
- **Hash table**: For quick server-to-position mapping
- **Virtual node metadata**: Mapping virtual nodes to physical servers

### Monitoring
- **Distribution metrics**: Standard deviation of key distribution
- **Load metrics**: Requests per server
- **Hotspot detection**: Identify overloaded servers

## Key Takeaways

1. **Consistent hashing solves redistribution problem** in distributed systems
2. **Virtual nodes are essential** for even distribution
3. **Trade-offs exist** between distribution quality and memory usage
4. **Widely adopted** in production distributed systems
5. **Clockwise lookup rule** is core to the algorithm
6. **Minimal impact** when servers are added or removed