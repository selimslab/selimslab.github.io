# Chapter 2: Back-of-the-Envelope Estimation

## Power of Two

Data volume units using power of 2:
- 1 byte = 8 bits
- 1 ASCII character = 1 byte
- 1 KB = 2^10 bytes = 1,024 bytes
- 1 MB = 2^20 bytes = 1,048,576 bytes
- 1 GB = 2^30 bytes = 1,073,741,824 bytes
- 1 TB = 2^40 bytes = 1,099,511,627,776 bytes
- 1 PB = 2^50 bytes = 1,125,899,906,842,624 bytes

## Latency Numbers Every Programmer Should Know

**Time units:**
- 1 nanosecond (ns) = 10^-9 seconds
- 1 microsecond (µs) = 10^-6 seconds = 1,000 ns
- 1 millisecond (ms) = 10^-3 seconds = 1,000 µs = 1,000,000 ns

**Operation latencies (approximate):**
- L1 cache reference: 0.5 ns
- Branch mispredict: 5 ns
- L2 cache reference: 7 ns
- Mutex lock/unlock: 100 ns
- Main memory reference: 100 ns
- Compress 1K bytes with Zippy: 10,000 ns = 10 µs
- Send 1K bytes over 1 Gbps network: 10,000 ns = 10 µs
- Read 4K randomly from SSD: 150,000 ns = 150 µs
- Read 1 MB sequentially from memory: 250,000 ns = 250 µs
- Round trip within same datacenter: 500,000 ns = 500 µs
- Read 1 MB sequentially from SSD: 1,000,000 ns = 1 ms
- Disk seek: 10,000,000 ns = 10 ms
- Read 1 MB sequentially from network: 10,000,000 ns = 10 ms
- Read 1 MB sequentially from disk: 30,000,000 ns = 30 ms
- Send packet CA→Netherlands→CA: 150,000,000 ns = 150 ms

**Key insights:**
- Memory is fast, disk is slow
- Avoid disk seeks when possible
- Simple compression algorithms are fast
- Compress data before sending over internet
- Data centers in different regions have significant latency

## Availability Numbers

**High availability definition:**
- System's ability to be continuously operational
- Measured as percentage (99% to 100%)
- Service Level Agreement (SLA) defines uptime commitment

**Availability levels:**
- 99% = 87.6 hours downtime per year
- 99.9% = 8.76 hours downtime per year
- 99.99% = 52.6 minutes downtime per year
- 99.999% = 5.26 minutes downtime per year

**Industry standards:**
- Cloud providers (Amazon, Google, Microsoft): 99.9% or higher
- "Nines" terminology: more nines = better availability

## Twitter QPS and Storage Example

**Assumptions:**
- 300 million monthly active users
- 50% daily usage rate
- 2 tweets per day per user
- 10% tweets contain media
- 5-year data retention

**Calculations:**

**Query Per Second (QPS):**
- Daily active users = 300M × 50% = 150M
- Tweets QPS = 150M × 2 tweets ÷ 24 hours ÷ 3600 seconds = ~3,500
- Peak QPS = 2 × QPS = ~7,000

**Storage estimation:**
- Average tweet size:
  - tweet_id: 64 bytes
  - text: 140 bytes
  - media: 1 MB
- Media storage per day = 150M × 2 × 10% × 1 MB = 30 TB
- 5-year media storage = 30 TB × 365 × 5 = ~55 PB

## Estimation Tips

**Process over precision:**
- Focus on problem-solving approach
- Demonstrate reasoning skills
- Precision less important than methodology

**Best practices:**
- **Round and approximate:** Use simple numbers (100,000 ÷ 10 instead of 99,987 ÷ 9.1)
- **Write assumptions:** Document all assumptions for reference
- **Label units:** Always specify KB, MB, GB, etc.
- **Common estimations:** Practice QPS, peak QPS, storage, cache, server count

**Key areas to practice:**
- Query per second calculations
- Storage requirements
- Cache sizing
- Server capacity planning
- Network bandwidth needs

## Framework Application

Back-of-the-envelope estimation is essential for:
- Initial system design decisions
- Capacity planning
- Cost estimation
- Performance requirements
- Resource allocation
- Scalability planning

The goal is demonstrating systematic thinking and problem-solving skills rather than perfect accuracy.