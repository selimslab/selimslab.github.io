# Chapter 1: Scale from Zero to Millions of Users

## Single Server Setup

Start simple - everything runs on one server: web app, database, cache.

**Request flow:**
1. Users access via domain names (api.mysite.com)
2. DNS returns IP address (15.125.23.214)
3. HTTP requests sent to web server
4. Server returns HTML/JSON response

**Traffic sources:**
- Web application: server-side languages (Java, Python) + client-side (HTML, JavaScript)
- Mobile application: HTTP protocol, JSON API responses

## Database Tier

Separate web/mobile traffic from database for independent scaling.

**Database types:**
- **Relational (SQL):** MySQL, PostgreSQL, Oracle - tables/rows, join operations
- **Non-relational (NoSQL):** CouchDB, Cassandra, DynamoDB - key-value, graph, column, document stores

**Choose NoSQL when:**
- Need super-low latency
- Data is unstructured/non-relational
- Only serialize/deserialize data
- Store massive amounts of data

## Scaling Strategies

**Vertical scaling (scale up):**
- Add more power (CPU, RAM) to existing servers
- Simple but has hard limits
- No failover/redundancy

**Horizontal scaling (scale out):**
- Add more servers to resource pool
- Better for large-scale applications
- Requires load balancer

## Load Balancer

Distributes incoming traffic among web servers.

**Benefits:**
- Prevents single point of failure
- Improves availability
- Uses private IPs for server communication
- Auto-routes traffic if server fails

## Database Replication

Master-slave relationship:
- **Master:** handles writes (insert, delete, update)
- **Slave:** handles reads (copies from master)

**Advantages:**
- Better performance (parallel query processing)
- Reliability (data preserved across locations)
- High availability (access backup if server fails)

**Failover scenarios:**
- Slave fails: redirect reads to master temporarily
- Master fails: promote slave to master

## Cache Layer

Temporary storage for expensive responses/frequently accessed data.

**Cache tier benefits:**
- Better system performance
- Reduces database workload
- Scales independently

**Read-through cache process:**
1. Web server checks cache first
2. If hit: return cached data
3. If miss: query database, cache result, return data

**Cache considerations:**
- Use for frequently read, infrequently modified data
- Implement expiration policy
- Maintain consistency between cache and database
- Avoid single point of failure (multiple cache servers)
- Choose eviction policy (LRU, LFU, FIFO)

## Content Delivery Network (CDN)

Network of geographically dispersed servers for static content.

**CDN workflow:**
1. User requests static asset via CDN URL
2. CDN checks cache
3. If miss: CDN requests from origin server
4. Origin returns file with TTL header
5. CDN caches and serves to user

**CDN considerations:**
- Cost optimization for frequently used assets
- Appropriate cache expiry times
- Fallback strategy for CDN failures
- File invalidation methods

## Stateless Web Tier

Move session data out of web servers to external storage.

**Stateful architecture issues:**
- Requests must route to same server
- Difficult to add/remove servers
- Challenging to handle failures

**Stateless architecture benefits:**
- Requests can go to any server
- Easier scaling (autoscaling)
- More robust and scalable

## Multi-Data Center Setup

Support multiple geographic locations for availability.

**Key components:**
- GeoDNS for traffic routing
- Data synchronization across centers
- Automated testing and deployment

**Technical challenges:**
- Traffic redirection
- Data synchronization
- Consistent testing/deployment

## Message Queue

Asynchronous communication buffer between services.

**Architecture:**
- Producers/publishers create messages
- Consumers/subscribers process messages
- Enables independent scaling

**Benefits:**
- Decouples system components
- Improves scalability and reliability
- Handles varying workloads

## Monitoring and Automation

**Logging:** Monitor error logs for system problems
**Metrics:** Track host-level, aggregated, and business metrics
**Automation:** CI/CD, automated deployment, testing

## Database Scaling

**Vertical scaling:**
- Add more power to existing machine
- Hardware limits
- Single point of failure risk
- High cost

**Horizontal scaling (sharding):**
- Split database into smaller parts (shards)
- Each shard has same schema, unique data
- Use hash function to determine shard

**Sharding challenges:**
- Resharding when growth exceeds capacity
- Celebrity problem (hotspot keys)
- Difficult join operations across shards

## Scaling Summary

**Key principles:**
- Keep web tier stateless
- Build redundancy at every tier
- Cache data extensively
- Support multiple data centers
- Use CDN for static assets
- Scale data tier through sharding
- Split into individual services
- Monitor and automate

**Evolution path:**
Single server → Load balancer → Database replication → Cache → CDN → Stateless web tier → Multi-data center → Message queue → Database sharding