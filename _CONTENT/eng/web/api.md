---
---
## API design

auth

versions

paging 

filtering 

idempotency 

evolution 


## types 
rest: standard HTTP features, stateless requests, resources

rpc: good for high perf internal comm.

gql: good for unpredictable data needs 
- arbitrary dynamic nesting
- clients can define the data shape they need without backend changes
- otherwise, it's harder to secure, cache, rate-limit. query complexity is hard to predict. 
