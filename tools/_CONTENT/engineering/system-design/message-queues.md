---
---

producer - queue - consumer 

## why 
decoupling : parts don't have to know about each other 

fault tolerance: messages wait in queue until services recover 

reliability: retry failed messages. if consumer crashes, messages wait in queue 

scalability: absorbs bursts 

## where 
- background jobs 
- data pipelines, etl 
- microservice communication
- event-driven systems


## what 

redis: simple pub/sub, fast, basic durability

rabbitmq: classic, mature, complex routing, web ui   

kafka: massive throughput

aws sqs, gcp pub/sub: managed service



