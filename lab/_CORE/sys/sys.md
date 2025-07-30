

## API design

rest: standard HTTP features, stateless requests, resources

rpc: good for high perf internal comm.

gql: good for unpredictable data needs 
- arbitrary dynamic nesting
- clients can define the data shape they need without backend changes
- otherwise, it's harder to secure, cache, rate-limit. query complexity is hard to predict. 


## message queues 

producer - queue - consumer 

decoupling, reliability, fault tolerance, scale 

redis: simple pub/sub, fast, basic durability

rabbitmq: classic, mature, complex routing, web ui   

kafka: massive throughput

aws sqs, gcp pub/sub: managed service

### DDD

Shared language 

Bounded Contexts

Domain models and core logic, independent of technology

## caching 

cache aside: app manages cache and db 

read-through: app talks to cache only. cache reads db 

write-through: write to cache&db in sync 

write-behind: write to cache first, db async 


## idempotency

1. db: unique, where, upsert
2. unique ids
3. http get, put, delete are idp. 
4. app logic
