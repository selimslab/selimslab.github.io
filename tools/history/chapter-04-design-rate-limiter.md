# Chapter 4: Design a Rate Limiter

## Problem Definition and Requirements

A rate limiter controls the rate of traffic sent by a client or service. It limits the number of requests a client can send within a specific time window.

### Key Requirements
- **Accuracy**: Precisely limit excessive requests
- **Low latency**: Minimal HTTP response time impact
- **Memory efficiency**: Use minimal memory
- **Distributed operation**: Work across multiple servers/processes
- **Exception handling**: Clear feedback when requests are throttled
- **Fault tolerance**: System continues operating if rate limiter fails

## Rate Limiter Placement Options

### 1. Client-Side Implementation
- **Problem**: Unreliable - clients can be forged by malicious actors
- **Limitation**: No control over client implementation

### 2. Server-Side Implementation
- Direct integration with API servers
- Full control over implementation

### 3. Middleware/API Gateway
- **Preferred approach**: Rate limiter as middleware component
- **Example**: Client sends 3 requests/second, limit is 2/second
  - First 2 requests: Routed to API servers
  - Third request: Throttled, returns HTTP 429 (Too Many Requests)
- **API Gateway benefits**: Supports rate limiting, SSL termination, authentication, IP whitelisting

## Rate Limiting Algorithms

### 1. Token Bucket Algorithm
**How it works:**
- Container with predefined capacity
- Tokens added at preset rate periodically
- Each request consumes one token
- No tokens = request dropped

**Parameters:**
- **Bucket size**: Maximum tokens allowed
- **Refill rate**: Tokens added per second

**Example:** Bucket size 4, refill rate 2 tokens/second
- **Pros**: Easy to implement, memory efficient, allows traffic bursts
- **Cons**: Challenging to tune parameters properly

**Used by**: Amazon, Stripe

### 2. Leaking Bucket Algorithm
**How it works:**
- FIFO queue processing at fixed rate
- Requests added to queue if not full
- Requests processed at regular intervals

**Parameters:**
- **Bucket size**: Queue capacity
- **Outflow rate**: Fixed processing rate

**Used by**: Shopify
- **Pros**: Memory efficient, stable outflow rate
- **Cons**: Burst traffic fills queue with old requests, parameter tuning difficulty

### 3. Fixed Window Counter Algorithm
**How it works:**
- Timeline divided into fixed-size windows
- Counter for each window
- Counter increments per request
- Requests dropped when threshold reached

**Problem**: Edge case allows 2x requests
- Example: 5 requests/minute limit
- 5 requests at 2:00:00-2:01:00
- 5 requests at 2:01:00-2:02:00
- Result: 10 requests in 2:00:30-2:01:30 window

**Pros**: Memory efficient, easy to understand
**Cons**: Traffic spikes at window edges

### 4. Sliding Window Log Algorithm
**How it works:**
- Tracks request timestamps (Redis sorted sets)
- Removes outdated timestamps on new requests
- Accepts request if log size ≤ allowed count

**Example**: 2 requests/minute limit
- 1:00:01: Log empty, request allowed
- 1:00:30: Added to log (size=2), allowed
- 1:00:50: Added to log (size=3), rejected
- 1:01:40: Remove outdated timestamps, request allowed

**Pros**: Very accurate rate limiting
**Cons**: High memory consumption (stores all timestamps)

### 5. Sliding Window Counter Algorithm
**How it works:**
- Hybrid of fixed window counter and sliding window log
- Formula: Current window requests + (Previous window requests × overlap percentage)

**Example**: 7 requests/minute limit
- Previous minute: 5 requests
- Current minute: 3 requests
- At 30% position: 3 + (5 × 0.7) = 6.5 ≈ 6 requests
- Request allowed (under 7 limit)

**Pros**: Smooths traffic spikes, memory efficient
**Cons**: Approximation (assumes even distribution)
**Accuracy**: Cloudflare reports 0.003% error rate in 400M requests

## High-Level Architecture

### Data Storage
- **Not database**: Too slow due to disk access
- **Redis cache**: Fast, supports time-based expiration
  - `INCR`: Increments counter by 1
  - `EXPIRE`: Sets timeout for counter auto-deletion

### System Flow
1. Client sends request to rate limiting middleware
2. Middleware fetches counter from Redis bucket
3. If limit reached: Request rejected
4. If limit not reached: Request sent to API servers, counter incremented

## Rate Limiting Rules

### Configuration Examples
```yaml
# Marketing messages
domain: messaging
descriptors:
  - key: message_type
    value: marketing
    rate_limit:
      unit: day
      requests_per_unit: 5

# Login attempts
domain: auth
descriptors:
  - key: auth_type
    value: login
    rate_limit:
      unit: minute
      requests_per_unit: 5
```

### HTTP Response Headers
- `X-Ratelimit-Remaining`: Remaining allowed requests
- `X-Ratelimit-Limit`: Total allowed requests per window
- `X-Ratelimit-Retry-After`: Seconds to wait before retry

## Distributed Environment Challenges

### 1. Race Condition
**Problem**: Multiple threads reading/writing counter simultaneously
- Thread 1 reads counter: 3
- Thread 2 reads counter: 3
- Both increment and write back: 4
- Correct value should be: 5

**Solutions**:
- Lua scripts in Redis
- Redis sorted sets
- Avoid locks (too slow)

### 2. Synchronization Issues
**Problem**: Multiple rate limiter servers
- Client 1 → Rate limiter 1
- Client 2 → Rate limiter 2
- If client 2 switches to rate limiter 1, no data exists

**Solutions**:
- **Avoid**: Sticky sessions (not scalable)
- **Use**: Centralized Redis data store

## Performance Optimization

### 1. Multi-Data Center Setup
- **Need**: Reduce latency for geographically distributed users
- **Example**: Cloudflare has 194 edge servers worldwide
- **Benefit**: Traffic routed to closest edge server

### 2. Eventual Consistency
- Data synchronization doesn't need to be immediate
- Trade-off between consistency and performance

## Monitoring and Analytics

### Key Metrics
- **Algorithm effectiveness**: Is rate limiting working?
- **Rule effectiveness**: Are rules too strict/lenient?

### Adjustment Scenarios
- **Too strict**: Many valid requests dropped → Relax rules
- **Flash sales**: Sudden traffic spikes → Switch to token bucket algorithm

## Additional Considerations

### Hard vs Soft Rate Limiting
- **Hard**: Requests cannot exceed threshold
- **Soft**: Requests can exceed threshold briefly

### Different Layers
- **Application layer** (HTTP - Layer 7): Discussed in chapter
- **Network layer** (IP - Layer 3): Using Iptables

### Client Best Practices
- Use client cache to reduce API calls
- Understand limits and avoid rapid requests
- Implement graceful error handling
- Add sufficient backoff time in retry logic

## Algorithm Selection Summary

| Algorithm | Memory | Accuracy | Burst Handling | Complexity |
|-----------|---------|-----------|----------------|------------|
| Token Bucket | Efficient | Good | Excellent | Low |
| Leaking Bucket | Efficient | Good | Poor | Low |
| Fixed Window | Very Efficient | Poor | Poor | Very Low |
| Sliding Window Log | High | Excellent | Good | Medium |
| Sliding Window Counter | Efficient | Good | Good | Medium |

## Key Takeaways

1. **Token bucket** is most popular due to simplicity and burst handling
2. **Sliding window log** provides highest accuracy but uses most memory
3. **Middleware placement** offers best flexibility
4. **Redis** is preferred for counter storage due to speed and built-in expiration
5. **Distributed environments** require careful handling of race conditions and synchronization
6. **Performance optimization** focuses on geographic distribution and eventual consistency
7. **Monitoring** is crucial for tuning rules and algorithms