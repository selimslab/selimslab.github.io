# Chapter 8: Design a URL Shortener

## Problem Definition and Requirements

### Basic Use Cases
1. **URL shortening**: Long URL → Short URL
2. **URL redirecting**: Short URL → Original URL
3. **High availability, scalability, and fault tolerance**

### System Requirements
- **Traffic**: 100 million URLs generated per day
- **Character set**: [0-9, a-z, A-Z] (62 characters)
- **Length**: As short as possible
- **Operations**: No deletion or updates (simplicity)

### Back-of-Envelope Estimation
- **Write operations**: 100M URLs/day = 1,160 writes/second
- **Read operations**: 10:1 read/write ratio = 11,600 reads/second
- **Storage duration**: 10 years
- **Total records**: 100M × 365 × 10 = 365 billion records
- **Average URL length**: 100 bytes
- **Storage requirement**: 365B × 100 bytes = 365 TB

## API Design

### 1. URL Shortening
```
POST /api/v1/data/shorten
Request: {longUrl: longURLString}
Response: shortURL
```

### 2. URL Redirecting
```
GET /api/v1/shortUrl
Response: HTTP redirect to longURL
```

## HTTP Redirect Types

### 301 Redirect (Permanent)
**Behavior**: Browser caches response, subsequent requests go directly to long URL
**Pros**: Reduces server load
**Cons**: Cannot track analytics easily

### 302 Redirect (Temporary)
**Behavior**: All requests go through shortening service first
**Pros**: Better analytics tracking (click rate, source)
**Cons**: Higher server load

**Decision**: Use 302 if analytics important, 301 if reducing server load is priority

## Hash Function Design

### Hash Value Length Calculation
- **Character set**: [0-9, a-z, A-Z] = 62 characters
- **Requirement**: Support 365 billion URLs
- **Calculation**: Find smallest n where 62^n ≥ 365 billion
- **Result**: n = 7 (62^7 = ~3.5 trillion)

### Hash Function Approaches

#### 1. Hash + Collision Resolution
**Process**:
1. Use hash function (CRC32, MD5, SHA-1)
2. Take first 7 characters
3. Check for collisions in database
4. If collision exists, append predefined string and rehash

**Example**:
- URL: https://en.wikipedia.org/wiki/Systems_design
- CRC32: 5cb54054 (too long)
- Take first 7: 5cb5405
- Check collision, append string if needed

**Pros**: Simple implementation
**Cons**: Expensive database queries for collision detection

**Optimization**: Use Bloom filters to reduce database queries

#### 2. Base 62 Conversion ⭐
**Process**:
1. Generate unique ID using ID generator
2. Convert ID to base 62 representation
3. Use result as short URL

**Example**:
- ID: 11157 (base 10)
- Conversion: 11157 = 2×62² + 55×62¹ + 59×62⁰
- Result: [2, 55, 59] → [2, T, X] → "2TX"
- Short URL: https://tinyurl.com/2TX

**Character mapping**:
- 0-9: 0-9
- 10-35: a-z
- 36-61: A-Z

## Data Model

### Database Schema
```sql
CREATE TABLE url_mapping (
    id BIGINT PRIMARY KEY,
    short_url VARCHAR(7) NOT NULL,
    long_url VARCHAR(2048) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_short_url (short_url)
);
```

### Why Not Hash Table?
- Memory limitations
- Data persistence requirements
- Scalability concerns
- Cost considerations

## URL Shortening Flow

### Detailed Process
1. **Input**: longURL received
2. **Check existence**: Query database for existing longURL
3. **If exists**: Return existing shortURL
4. **If new**: 
   - Generate unique ID via distributed ID generator
   - Convert ID to shortURL using base 62
   - Save (ID, shortURL, longURL) to database
   - Return shortURL to client

### Example
- **Input**: https://en.wikipedia.org/wiki/Systems_design
- **Generated ID**: 2009215674938
- **Base 62 conversion**: "zn9edcu"
- **Database record**: (2009215674938, "zn9edcu", "https://en.wikipedia.org/wiki/Systems_design")

## URL Redirecting Flow

### System Architecture
- **Cache layer**: Store frequent <shortURL, longURL> mappings
- **Database layer**: Persistent storage
- **Load balancer**: Distribute requests

### Detailed Process
1. **User clicks**: https://tinyurl.com/zn9edcu
2. **Load balancer**: Forward to web server
3. **Cache check**: If shortURL in cache, return longURL
4. **Database query**: If not in cache, fetch from database
5. **Error handling**: If not found, return invalid URL error
6. **Response**: Return longURL to user for redirect

## System Architecture

### Components
- **Web servers**: Handle HTTP requests
- **Load balancer**: Distribute traffic
- **Cache layer**: Redis/Memcached for frequent lookups
- **Database**: Store URL mappings
- **ID generator**: Create unique IDs
- **Analytics service**: Track clicks and metrics

### Scaling Considerations
- **Stateless web tier**: Easy horizontal scaling
- **Database replication**: Master-slave setup
- **Database sharding**: Partition by URL hash
- **CDN**: Cache popular redirects globally

## Additional Features

### 1. Rate Limiting
**Problem**: Malicious users sending excessive requests
**Solution**: Rate limiter based on IP address or user
**Implementation**: Token bucket or sliding window

### 2. Analytics
**Metrics to track**:
- Click count per URL
- Click timestamps
- Geographic distribution
- Referrer information
- User agent data

**Storage**: Separate analytics database or data warehouse

### 3. Security
**Malicious URLs**: Content filtering and blacklisting
**Spam prevention**: Rate limiting and captcha
**Link expiration**: TTL for short URLs

## Performance Optimizations

### Caching Strategy
- **Cache hit ratio**: 80-90% for popular URLs
- **Cache size**: LRU eviction for memory management
- **TTL**: Short expiration for fresh data

### Database Optimization
- **Indexing**: On short_url column
- **Connection pooling**: Efficient database connections
- **Read replicas**: Scale read operations

### CDN Integration
- **Global distribution**: Reduce latency
- **Cache popular redirects**: Minimize database queries
- **Geographic routing**: Route to nearest server

## Monitoring and Alerts

### Key Metrics
- **Response time**: P95, P99 latencies
- **Throughput**: Requests per second
- **Error rates**: 4xx, 5xx errors
- **Cache hit ratio**: Cache effectiveness
- **Database performance**: Query times

### Health Checks
- **Service availability**: Endpoint monitoring
- **Database connectivity**: Connection health
- **Cache availability**: Redis/Memcached status

## Comparison: Hash vs Base 62

| Aspect | Hash + Collision | Base 62 Conversion |
|--------|------------------|-------------------|
| Implementation | Complex | Simple |
| Collision handling | Required | Not needed |
| Database queries | High (collision check) | Low |
| Performance | Slower | Faster |
| ID dependency | No | Yes (requires ID generator) |
| URL predictability | Lower | Higher |

## Real-World Examples

### Production Systems
- **bit.ly**: Advanced analytics and custom domains
- **tinyurl.com**: Simple URL shortening
- **goo.gl**: Google's URL shortener (discontinued)
- **t.co**: Twitter's URL shortener

### Business Applications
- **Social media**: Track link engagement
- **Email marketing**: Measure click-through rates
- **QR codes**: Bridge physical and digital
- **Mobile apps**: Share long URLs efficiently

## Key Takeaways

1. **Base 62 conversion** is preferred over hash + collision resolution
2. **Caching** is critical for read-heavy workloads
3. **Unique ID generator** is essential for distributed systems
4. **Analytics** adds significant business value
5. **Rate limiting** prevents abuse
6. **Database scaling** requires replication and sharding
7. **302 redirects** enable better analytics tracking