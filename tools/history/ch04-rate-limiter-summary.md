# Chapter 4: Rate Limiter Design Summary

## Problem Definition

Rate limiter controls request frequency to prevent system overload and ensure fair resource usage.

**Key Requirements:**
- Accurately limit excessive requests
- Low latency (don't slow HTTP responses)
- Memory efficient
- Distributed rate limiting across servers
- Clear exception handling (show throttled users)
- High fault tolerance (failures don't break system)

## Architecture Decisions

### Placement Options

**Client-side:** Unreliable - requests easily forged, no control over implementation

**Server-side:** Direct integration with API servers

**Middleware/Gateway:** Separate component between client and servers
- Returns HTTP 429 (too many requests) when limit exceeded
- API gateways provide rate limiting plus SSL, authentication, IP whitelisting

**Decision factors:**
- Current technology stack
- Required algorithm control
- Existing microservice architecture
- Engineering resources

## Rate Limiting Algorithms

### Token Bucket
**Mechanism:** Container with predefined capacity, tokens added at preset rate
- Request consumes one token
- If tokens available: request proceeds
- If no tokens: request dropped

**Parameters:**
- Bucket size: maximum tokens allowed
- Refill rate: tokens added per second

**Pros:** Easy implementation, memory efficient, allows traffic bursts
**Cons:** Two parameters difficult to tune properly

**Use cases:** Amazon and Stripe APIs

### Leaking Bucket
**Mechanism:** FIFO queue, requests processed at fixed rate
- Request arrives: added to queue if not full, else dropped
- Requests pulled from queue at regular intervals

**Parameters:**
- Bucket size: queue capacity
- Outflow rate: requests processed per second

**Pros:** Memory efficient, stable outflow rate
**Cons:** Burst traffic fills queue with old requests, rate limits recent ones

**Use cases:** Shopify

### Fixed Window Counter
**Mechanism:** Timeline divided into fixed windows, counter per window
- Each request increments counter
- Counter hits threshold: drop new requests until next window

**Example:** 3 requests per second window

**Pros:** Memory efficient, easy to understand, fits quota reset use cases
**Cons:** Traffic bursts at window edges allow 2x allowed requests

### Sliding Window Log
**Mechanism:** Track request timestamps, remove outdated ones
- New request: remove old timestamps beyond current window
- Add new timestamp to log
- Accept if log size ≤ allowed count

**Example:** 2 requests per minute, timestamps stored in Redis sorted sets

**Pros:** Very accurate rate limiting
**Cons:** High memory consumption (stores all timestamps)

### Sliding Window Counter
**Mechanism:** Hybrid of fixed window and sliding log
- Formula: Current window requests + Previous window requests × overlap percentage
- Example: 3 current + 5 previous × 0.7 = 6.5 requests (rounded down to 6)

**Pros:** Smooths traffic spikes, memory efficient
**Cons:** Approximation (assumes even distribution), 0.003% error rate per Cloudflare

## System Architecture

### High-Level Design
**Storage:** Redis in-memory cache for speed and time-based expiration
- INCR: increment counter
- EXPIRE: set timeout for auto-deletion

**Flow:**
1. Client → Rate limiting middleware
2. Middleware fetches counter from Redis
3. If limit reached: reject request
4. If limit not reached: forward to API servers, increment counter

### Rate Limiting Rules
**Configuration example:**
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

### Rate Limit Response Headers
- `X-Ratelimit-Remaining`: Requests left in window
- `X-Ratelimit-Limit`: Max calls per time window  
- `X-Ratelimit-Retry-After`: Seconds to wait before retry

## Distributed Environment Challenges

### Race Conditions
**Problem:** Multiple threads read same counter value, both increment without checking other
- Counter value 3 → Two threads both write 4 → Should be 5

**Solutions:**
- Locks (slow)
- Lua scripts in Redis
- Redis sorted sets

### Synchronization Issues
**Problem:** Multiple rate limiter servers, clients can hit different servers
- Rate limiter 1 has no data about clients served by rate limiter 2

**Solutions:**
- Sticky sessions (not recommended - not scalable)
- Centralized data store (Redis) - recommended

## Performance Optimization

### Multi-Data Center Setup
- Edge servers reduce latency (Cloudflare: 194 global locations as of 2020)
- Route traffic to closest server

### Eventual Consistency
- Synchronize data across data centers with eventual consistency model
- Acceptable for rate limiting use cases

## Monitoring

**Effectiveness metrics:**
- Algorithm performance under various traffic patterns
- Rule appropriateness (too strict = valid requests dropped)
- Sudden traffic spikes (flash sales) may require algorithm changes

**Example:** Switch to token bucket for burst traffic handling

## Additional Considerations

### Hard vs Soft Rate Limiting
- **Hard:** Requests cannot exceed threshold
- **Soft:** Requests can exceed threshold briefly

### Multi-Layer Rate Limiting
- **Application layer (HTTP/Layer 7):** Main focus
- **Network layer (IP/Layer 3):** Using iptables

### Client Best Practices
- Use caching to reduce API calls
- Understand limits, don't exceed thresholds
- Graceful exception handling
- Implement retry logic with backoff

## Key Trade-offs

| Algorithm | Memory | Accuracy | Burst Handling | Implementation |
|-----------|---------|----------|----------------|----------------|
| Token Bucket | Efficient | Good | Excellent | Easy |
| Leaking Bucket | Efficient | Good | Poor | Medium |
| Fixed Window | Very Efficient | Poor | Poor | Easy |
| Sliding Log | High | Excellent | Good | Medium |
| Sliding Counter | Efficient | Good | Good | Medium |

## Implementation Priority

1. **Start with token bucket** for general use cases
2. **Use sliding window counter** for better accuracy with memory efficiency
3. **Consider leaking bucket** for stable processing rates
4. **Avoid fixed window** except for simple quota resets
5. **Use sliding log** only when perfect accuracy required and memory not constrained 