---
tags: swe sys os
---
Parallelism includes multiple cores while concurrency is running multiple tasks simultaneously, not exactly at the same time but progressing one task a bit and switching to another 

## Actor model 

An actor is an isolated process managed by the language runtime. 

Erlang and Elixir natively implements them as distributed actors are core to the language design 

Akka tries to bring actor support to JVM 

## CSP 

Go and Clojure use this model. Sequential processes can be OS processes but also threads or green-threads managed at the user-space 

Go routines communicating with channels 

It works well but it's limited to a single runtime, even the two go processes on the same machine cannot coordinate with this, let alone distributed machines 