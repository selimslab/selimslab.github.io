---
---


[Patterns of Distributed Systems by Martin Fowler](https://martinfowler.com/articles/patterns-of-distributed-systems/) 


- **Request Batch**
- Reduce network overhead for many small operations
- Combine multiple requests into a single network transmission
  - Accumulate requests until batch size or timeout, then send all at once
- Kafka producers batch multiple records into a single request

- **Request Pipeline**
- Reduce latency impact of network round-trips
- Send multiple requests without waiting for previous responses
  - Send multiple requests back-to-back; process in order and return responses in same order
- Redis clients can pipeline commands to improve throughput

- **Single-Socket Channel**
- Ensure FIFO operation ordering between client and server
- Use single TCP connection for all communication
  - Leverage TCP's guaranteed in-order delivery on a single connection
- ZooKeeper clients maintain one connection for operation ordering

- **Request Waiting List**
- Handle requests dependent on future conditions
- Queue requests for processing when conditions are met
  - Maintain pending request list with completion criteria
- Distributed transaction managers queue participant responses

- **Singular Update Queue**
- Process updates in order without blocking clients
- Queue updates for asynchronous processing by a single thread
  - Process all updates through one thread to ensure ordering
- Kafka controller uses a single-threaded event processor
