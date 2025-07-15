# Chapter 4: Design a Rate Limiter - Summary

## Problem Definition & Requirements

### Core Requirements
- **Accuracy**: Limit excessive requests precisely
- **Low latency**: Don't slow down HTTP response time  
- **Memory efficiency**: Use minimal memory
- **Distributed capability**: Share across multiple servers/processes
- **Exception handling**: Clear feedback when requests throttled
- **High fault tolerance**: System continues if rate limiter fails

### Implementation Placement Options
- **Client-side**: Unreliable (easily forged, no control over implementation)
- **Server-side**: Direct implementation at API servers
- **Middleware/API Gateway**: Separate component handling rate limiting, SSL, auth, etc.

## Rate Limiting Algorithms

### 1. Token Bucket Algorithm
**How it works:**
- Container with predefined capacity holds tokens
- Tokens added at preset rate (e.g., 2 tokens/second)
- Each request consumes 1 token
- Request blocked if insufficient tokens

**Parameters:**
- Bucket size: maximum tokens allowed
- Refill rate: tokens added per second

**Example:** Bucket size 4, refill rate 4 per minute
- Multiple buckets needed: different endpoints, IP addresses, global limits
- User example: 1 post/second, 150 friends/day, 5 likes/second = 3 buckets

**Pros:** Easy to implement, memory efficient, allows traffic bursts
**Cons:** Challenging to tune bucket size and refill rate properly

### 2. Leaking Bucket Algorithm
**How it works:**
- FIFO queue processes requests at fixed rate
- New requests added to queue if not full
- Requests dropped if queue full
- Regular interval processing

**Parameters:**
- Bucket size: queue size
- Outflow rate: requests processed per second

**Used by:** Shopify for e-commerce rate limiting

**Pros:** Memory efficient, stable outflow rate
**Cons:** Traffic bursts fill queue with old requests, limiting recent ones

### 3. Fixed Window Counter Algorithm
**How it works:**
- Timeline divided into fixed-size windows
- Counter increments per request
- Requests dropped when threshold reached

**Example:** 3 requests/second limit, 1-second windows

**Major flaw:** Traffic bursts at window edges allow 2x quota
- Example: 5 requests/minute limit
- Window 2:00:00-2:01:00: 5 requests
- Window 2:01:00-2:02:00: 5 requests  
- Sliding window 2:00:30-2:01:30: 10 requests (2x limit)

**Pros:** Memory efficient, easy to understand
**Cons:** Edge traffic spikes exceed limits

### 4. Sliding Window Log Algorithm
**How it works:**
- Track all request timestamps
- Remove outdated timestamps (older than current window)
- Add new request timestamp
- Accept if log size ≤ allowed count

**Example:** 2 requests/minute limit
- 1:00:01: allowed (log size 1)
- 1:00:30: allowed (log size 2)  
- 1:00:50: rejected (log size 3 > 2)
- 1:01:40: allowed after removing outdated timestamps

**Pros:** Very accurate rate limiting
**Cons:** High memory consumption (stores all timestamps)

### 5. Sliding Window Counter Algorithm
**Hybrid approach combining fixed window + sliding window log**

**Formula:** Current window requests + (Previous window requests × overlap percentage)

**Example:** 7 requests/minute limit
- Previous minute: 5 requests
- Current minute: 3 requests
- New request at 30% position: 3 + 5 × 0.7 = 6.5 ≈ 6 requests
- Request allowed (6 < 7 limit)

**Accuracy:** Cloudflare experiments show only 0.003% error rate among 400M requests

**Pros:** Smooths traffic spikes, memory efficient
**Cons:** Approximation assuming even distribution

## Architecture & Implementation

### High-Level Architecture
**Storage:** Redis in-memory cache (not database due to slow disk access)
**Redis commands:**
- `INCR`: Increment counter by 1
- `EXPIRE`: Set timeout for automatic deletion

**Flow:**
1. Client → Rate limiting middleware
2. Middleware fetches counter from Redis
3. Check limit reached
4. If exceeded: reject (429 status)
5. If allowed: forward to API servers + increment counter

### Rate Limiting Rules
**Example configurations:**
```yaml
domain: messaging
descriptors:
- key: message_type
  value: marketing
  rate_limit:
    unit: day
    requests_per_unit: 5
```

**Storage:** Configuration files on disk, cached by workers

### HTTP Response Headers
**Standard headers:**
- `X-Ratelimit-Remaining`: Remaining allowed requests
- `X-Ratelimit-Limit`: Calls per time window
- `X-Ratelimit-Retry-After`: Seconds to wait before retry

**Error response:** HTTP 429 (Too Many Requests)

## Distributed Environment Challenges

### 1. Race Conditions
**Problem:** Concurrent threads reading same counter value
- Example: Counter = 3, two threads both read 3, increment to 4, write back
- Result: Counter = 4 (should be 5)

**Solutions:**
- Locks (slow performance)
- Lua scripts
- Redis sorted sets

### 2. Synchronization Issues
**Problem:** Multiple rate limiter servers without shared state
- Client 1 → Rate limiter 1
- Client 2 → Rate limiter 2  
- If client switches servers, no shared counter data

**Solutions:**
- Sticky sessions (not scalable)
- **Centralized Redis store** (preferred)

## Performance Optimization

### 1. Multi-Data Center Setup
- **Edge servers**: Route to closest location (Cloudflare: 194 locations as of 2020)
- **Latency reduction**: Critical for global user base

### 2. Eventual Consistency Model
- Accept temporary inconsistencies for better performance
- Trade-off between strict consistency and system performance

## Monitoring & Analytics

### Key Metrics
- **Algorithm effectiveness**: Is rate limiting working?
- **Rule effectiveness**: Are rules too strict/loose?

### Adaptive Responses
- **Too strict rules**: Many valid requests dropped → relax rules
- **Traffic spikes** (flash sales): Switch algorithms (e.g., token bucket for bursts)

## Additional Considerations

### Hard vs Soft Rate Limiting
- **Hard**: Strict threshold enforcement
- **Soft**: Allow brief threshold exceedance

### Multi-Layer Rate Limiting
- **Application layer** (HTTP/Layer 7): Covered in chapter
- **Network layer** (IP/Layer 3): Using iptables

### Client Best Practices
- **Caching**: Avoid frequent API calls
- **Respect limits**: Don't exceed known thresholds
- **Exception handling**: Graceful error recovery
- **Backoff strategy**: Sufficient retry delays

## Algorithm Comparison Summary

| Algorithm | Memory | Accuracy | Burst Handling | Complexity |
|-----------|---------|----------|----------------|------------|
| Token Bucket | Efficient | Good | Excellent | Low |
| Leaking Bucket | Efficient | Good | Poor | Low |
| Fixed Window | Very Efficient | Poor | Poor | Very Low |
| Sliding Window Log | High | Excellent | Good | Medium |
| Sliding Window Counter | Efficient | Good | Good | Medium |

**Recommended:** Token bucket for most use cases, sliding window counter for balanced accuracy/efficiency. 