---
---
decouple
buffer
auto-retry
discovery
fan-out
broadcast

## message qs
producer - q - consumer

redis
rabbitmq
kafka
aws sqs
gcp pub/sub

## delivery
at most once: fire and forget
at least once: retry
exactly once: idemp. + atomic commits

## work qs
retry
dead-letter
timeout
idempotency
backpressure
ordering
partitioning
