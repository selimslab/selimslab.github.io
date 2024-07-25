---
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

[Is Scala's actors similar to Go's coroutines? - Stack Overflow](https://stackoverflow.com/questions/22621514/is-scalas-actors-similar-to-gos-coroutines)

[Why you can have millions of Goroutines but only thousands of Java Threads (rcoh.me)](https://rcoh.me/posts/why-you-can-have-a-million-go-routines-but-only-1000-java-threads/)

[Concurrent Programming — Erlang System Documentation v27.0.1](https://www.erlang.org/doc/system/conc_prog)

