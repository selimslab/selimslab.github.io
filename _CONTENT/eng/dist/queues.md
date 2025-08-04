---
---
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

exactly once: idemp. , tx, 2pc 

## work qs

...


## Kafka 

- custom wire protocol, no byte copying 
- batch + pagecache + fsync frequently 
- sendfile syscall to copy directly from pagecache to network 