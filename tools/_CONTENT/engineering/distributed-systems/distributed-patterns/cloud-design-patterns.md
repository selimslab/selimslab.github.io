---
---

## Communication Patterns
- **Ambassador**: Helper services that send network requests on behalf of consumers
- **Anti-Corruption Layer**: Façade between modern applications and legacy systems
- **Asynchronous Request-Reply**: Decouple backend processing from frontend hosts
- **Backends for Frontends**: Create separate backend services for specific frontends
- **Gateway Aggregation**: Aggregate multiple requests into a single request
- **Gateway Offloading**: Offload shared functionality to a gateway proxy
- **Gateway Routing**: Route requests to multiple services using a single endpoint
- **Messaging Bridge**: Enable communication between incompatible messaging systems
- **Valet Key**: Provide restricted direct access to resources using tokens

## Data Management Patterns
- **Cache-Aside**: Load data on demand into a cache
- **CQRS**: Separate read and update operations using different interfaces
- **Event Sourcing**: Record full series of events in an append-only store
- **Index Table**: Create indexes over frequently queried fields
- **Materialized View**: Generate prepopulated views for optimized queries
- **Sharding**: Divide data stores into horizontal partitions

## Resiliency Patterns
- **Bulkhead**: Isolate application elements into pools to prevent cascading failures
- **Circuit Breaker**: Handle faults that take variable time to fix
- **Compensating Transaction**: Undo work performed by a series of steps
- **Health Endpoint Monitoring**: Implement functional checks through exposed endpoints
- **Leader Election**: Coordinate actions by electing a leader instance
- **Retry**: Handle temporary failures by retrying operations
- **Saga**: Manage data consistency across microservices in distributed transactions
- **Throttling**: Control resource consumption by applications or tenants

## Scalability Patterns
- **Claim Check**: Split large messages to avoid overwhelming message buses
- **Competing Consumers**: Enable multiple consumers to process messages on the same channel
- **Compute Resource Consolidation**: Consolidate multiple tasks into a single unit
- **Geode**: Deploy backends across geographical nodes that can serve any region
- **Queue-Based Load Leveling**: Use queues as buffers to smooth intermittent loads
- **Priority Queue**: Prioritize requests to process higher priority ones more quickly

## Design & Implementation Patterns
- **Choreography**: Let services decide when and how operations are processed
- **Deployment Stamps**: Deploy multiple independent copies of application components
- **Edge Workload Configuration**: Centralize configuration for multiple systems
- **External Configuration Store**: Move configuration to a centralized location
- **Pipes and Filters**: Break complex processing into reusable elements
- **Publisher/Subscriber**: Announce events to multiple consumers asynchronously
- **Scheduler Agent Supervisor**: Coordinate actions across distributed services
- **Sequential Convoy**: Process related messages in defined order
- **Sidecar**: Deploy components in separate processes for isolation
- **Static Content Hosting**: Deploy static content to cloud-based storage services
- **Strangler Fig**: Incrementally migrate legacy systems

## Security Patterns
- **Federated Identity**: Delegate authentication to external identity providers
- **Gatekeeper**: Protect applications using a dedicated broker that validates requests
- **Quarantine**: Ensure external assets meet quality levels before consumption
- **Rate Limit Pattern**: Avoid throttling errors by controlling request rates

[Source: Microsoft Azure Architecture Patterns](https://learn.microsoft.com/en-us/azure/architecture/patterns/)


