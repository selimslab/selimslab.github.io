---
title: API Design
---


## rest

leverages standard HTTP features like methods, caching, security features, tooling

resource urls 

stateless requests, good for horizontal scaling - are others stateful? 


## rpc

treats apis as remote function calls 

json-rpc, grpc with protocol buffers 

focused on direct method execution, not resource manipulation 

good for high-perf internal communication 


## gql 

One major gql selling point is fetching all data in one query. It's not always useful, eg. if resolvers depend on each other, gql server is not parallel and it'll resolve fields sequentially, it's still sum of all the slow operations. While in REST, you can make parallel requests. 

REST is easier to secure, cache, and rate-limit.


- wider attack surface since query lang is exposed to clients 
- query complexity is hard to predict 
- cyclical schemas and deep nesting are possible. 
- n+1 problem in resolvers and auth 
- http codes are less useful, 200 can be ok or fail 
- auth, validation, fetching are scattered in gql types and resolvers. 


## when it's still a good choice 
unpredictable data needs 
- arbitrary dynamic nesting
- clients can define the data shape they need without backend changes


[Why I'm Over GraphQL](https://bessey.dev/blog/2024/05/24/why-im-over-graphql/)


