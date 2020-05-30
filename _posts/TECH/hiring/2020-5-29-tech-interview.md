---
layout: post
title: Tech Interview
tags: hiring
categories: Tech 
---


A list to select questions for a technical interview


+ Remember to be respectful, ignorance is not stupidity
  
+ Ask questions out of curiosity. Don't cross-examine. 
  

## Basics 

fizzbuzz

remove duplicates from array 

Time complexity 

## Data Structures

Char, String, Integer, Float, Double, Decimal, Bool 

Array 

Linked list 

Trees, BST, min-heap, max-heap, prefix tree 

Hashmap 

Set 

Stack

Queue

Priority queue



## Algorithms 

Remove duplicates

Reverse string

Filter a value

Sort collection

Map-reduce

Flatlist 

Read a file 

Parse a web page

Cache

Debug 

Optimize 

Algorithm  (sort, search, graph, dynamic, scheduling, recursive, concurrent)

## Graph algorithms 

dfs, bfs, topological, binary tree, graph traversal, pre, post, ignorer, level order, 


## Strings

Ascii vs utf8, utf16, unicode 



## Databases 

When would you use a document database like MongoDB instead of a relational database like MySQL or PostgreSQL?

Indexes 

B-tree

Log structured merge tree

Sharding 

Federation 

Sql vs NoSQL

CAP theorem 

### ACID

* Atomicity -  all or nothing
* Consistency - from one valid state to another
* Isolation - as if they are serial, even if it is concurrent 
* Durability - Once committed, stay there 

### Db scaling tactics 
1. replication 
    * leader-leader
    * leader-follower
 
2. federation

3. sharding

4. denormalization 

5. SQL tuning
   

## Big Data

data parallelism 

OLAP vs OLTP

map reduce 

wide column stores 

The lambda architecture ? Update batch views with real time stream results 


## Operating Systems

process vs thread 

Sigkill 

Kernel 

Linux 

Kernel

User space, kernel space 

Thread vs process 

Memory safety, virtual memory 

Mutex vs Semaphore

Both Mutex and Semaphore are locks

only the acquiring thread can release the mutex

semaphore is like a counter, only the thread count is important. 


## Networking 

TCP/IP, UDP, OSI network layers 

NAT (Network Address Translation) ? -> enables many devices in the same network to use the same IP 
 

## Unix commands

grep 

find

ls

cd 

move 

unix pipelines 

everything is a file ? 

## Testing

What is TDD ?

Unit

integration 

end-to-end 

<br>

Sanity check 

Smoke test 

regression 

<br>

load test

Performance

Stress

capacity

<br>

Usability 

Recovery

<br>

User story tests

Acceptance test


## Code Quality

How would you ensure the code quality, readable and maintainable code ?

What do you think about automated testing, CI/CD, code reviews ?

Version Control 

Git diff, stash, branch, pull request

code reviews

documentation

CI/CD 



## Web 

REST 

HTTP verbs

HTTP status codes 302, 400, 404, 500 

TCP vs UDP 

WebRTC 

WebSocket

* How would you manage Web Services API versioning?

* From a backend perspective, are there any disadvantages or drawbacks on the adoption of Single Page Applications?

### Auth

Token auth, JWT

Session auth, session cookie in request header for every request

Permissions

Rate limiting 

## clean code 

* What makes code readable?

* What would you do to understand if your code has a bad design?

* Code smells 

* Design Patterns

*  Why High Cohesion and Loose Coupling are important?

* OOP

    Abstraction, Encapsulation, Inheritance, Polymorphism

* SOLID

* DRY


## Parallelism

Parallel Speed Up is limited bec. of overhead and must-be sequential operations

## Concurrency

* Why do we need concurrency, anyway? Explain.

* What is a race condition? Code an example

* What is a deadlock?
 
Hardware interrupts

Thread

Process

Goroutines and channels in Go

Actors in Scala and Erlang 


## System Design  

"People who like this also like... ". How would you implement this feature ?

how would you implement dark mode?

* When would you use request/reply and when publish/subscribe?

* Why does Event-Driven Architecture improve scalability?

* Client-server, pub-sub, event-driven, microservice, hexagonal, serverless architectures

Consistency patterns, Weak, strong, eventual

Availability patterns, Failover, Replication

DNS

CDN

Load Balancer


## languages

* Tell me the 3 worst defects of your preferred language

* What does it mean when a language treats functions as first-class citizens?

* What is a stack and what is a heap? What's a stack overflow?

* What are higher-order functions? What are they useful for? Write one, in your preferred language.

* procedural, declarative, OOP, FP

* Why do array indexes start with '0' in most languages?



## general

* Why does functional programming matter? When should a functional programming language be used?

* What is encapsulation important for?

* What is inheritance important for?

* What is palym important for?

* How do companies like Microsoft, Google, Opera and Mozilla profit from their browsers?

* How can immutability help write safer code?

* What's the difference between TCP and HTTP?



## security 

* How do you write secure code? 

* XSS

* CSRF
  
* Why is it said that cryptography is not something you should try to invent or design yourself?

* Write down a snippet of code affected by SQL injection and fix it.

* How does HTTPS work?

* What's a man-in-the-middle attack, and why does HTTPS help protect against it?


## hands on  

* Using your preferred language, write a REPL that echoes your inputs. Evolve it to make it a calculator.

* Generate a sequence of unique random numbers.

* Write a basic message broker, using whatever language you like.



## open ended

* What does it mean to be a "professional"?

* Is developing software an art, a craftsmanship or an engineering? Your opinion.

* "People who like this also like... ". How would you implement this feature in an e-commerce shop?

* You are my boss and I'm performing low. Inform me.

* If you could travel back in time, which advice would you give to your younger self?

* Interview me.

* Explain threads to your grandparents

* Explain unicode 

* Say your company gives you one week you can use to improve your and your colleagues' lifes: how would you use that week?
  
* List the last 3 books you read.

* Explain database transactions to a 5 year old child.

* How would you deal with legacy code?

* How would you design a software system for scalability?

* What are the pros and cons of microservice architecture?

* convince me to invest in code quality 




