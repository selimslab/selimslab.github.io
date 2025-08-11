---
---
some usecases
- decouple
- buffer
- auto-retry
- discovery
- fan-out
- broadcast

## message qs

producer - queue - consumer

decoupling, reliability, fault tolerance, scale

redis: simple pub/sub, fast, basic durability

rabbitmq: classic, mature, complex routing, web ui

kafka: massive throughput

aws sqs, gcp pub/sub: managed service


## delivery

at most once: fire and forget

at least once: retry

exactly once: idemp + atomic commits

## work qs

celery

retry logic, dead-letter q, job status
