---
---
```
api/v1/people/123/ideas

auth 

sort 
search
filter 
page: offset/limit or cursor 

idempotency

sec 
  validate
  auth
  cors 
  csrf token 
  csp, allowlist for xss 
  rate limit 
    l4 firewall
    l7 app 

http 
  get 
  put 
  patch  
  delete 
  post
  
rest 
  http 
  webtech 
  crud, public apis 
  standard HTTP features
  stateless requests
  resources
    
rpc 
  binary 
  perf
  type safety 
  proto versioning 
  custom caching 
  custom metrics 
  microservices, streaming 
  
gql 
  arbitrary data
  dynamic nesting 
  harder to:
    secure
    rate limit
    cache
    predict query complexity 
  query caching 
  n+1 -> data loader batch 
  subscriptions
  mobile apps 
```