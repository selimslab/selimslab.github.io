---
layout: post
title: Tech Interview
tags: tech 
---

## Basics 

Big O

Time complexity of binary search 



## Databases 

Indexes 

B-tree

Log structured merge tree

Sharding 

Federation 

Sql vs nodal 

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

Algorithm  ( sort, search, graph, dynamic, scheduling, recursive, concurrent)

## Graph algorithms 

dfs, bfs, topological, binary tree, graph traversal, pre, post, ignorer, level order, 


## Strings

Ascii vs utf8, utf16, unicode 



Arch 
Operational excellence
Secure
Reliable
High Performance
Cost effective

## Operating Systems

process vs thread 

Sigkill 

Kernel 

Linux 


## Unix commands

grep 

find

ls

cd 

move 


## Testing

Unit 

integration 

end-to-end 

Sanity check 

Smoke test 

regression 

load test

Performance

Stress

capacity

Usability 

Recovery

End to end tests

User story tests

Acceptance test


## Security



## OOP

Abstraction

Encapsulation

Inheritance

Polymorphism


Interfaces
ABCs
Classmethod
Staticmethod

## SOLID 

single responsibility

open closed

lyskov substitution

interface segregation

dependency injection


## Design Patterns

---

## Web 

REST 

HTTP methods

HTTP status codes 302, 400, 404, 500 

TCP vs UDP 

WebRTC 

WebSocket

## Auth

Token auth, JWT

Session auth, session cookie in request header for every request

Permissions

Rate limiting 


## OSI network layers 

App, http

Presentation, jpeg

Session 

Transport, tcp

Network, ip

Data link, ethernet

Physical, usb


## Code Quality

How would you ensure the code quality, readable and maintainable code ?

What do you think about automated testing, CI/CD, code reviews ?

Version Control 

Git diff, stash, branch, pull request

code reviews

documentation

CI/CD 


## JS

Js strength and weaknesses 

callback

promise

async await 

-> arrow, ... spread

filter, map, reduce 

V8 

let, const 

Functional programming  -> immutable values, pure functions, higher order functions, closures

```js
for (var i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
} 
// 5 5 5 5 5


// when you replace var with let 
for (let i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
} 
// 0 1 2 3 4 
```

The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?

```js

var list = readHugeList();

let nextListItem = function() {
    var item = list.pop();
    if (item) {
        // may cause a stack overflow
        nextListItem();
    }
};

let nextListItem = function() {
    var item = list.pop();
    if (item) {
        // fixed
        setTimeout( nextListItem, 0);
    }
};

```

## Concurrency

Hardware interrupts

Thread

Process

Goroutines and channels in Go

Actors in Scala and Erlang 



## System Design  

"People who like this also like... ". How would you implement this feature ?

how would you implement dark mode?

## Python



```python
def foo(d, l):
    d[3] = 7
    l.append(5)

def bar():
    d = {3: 4}
    l = []
    foo(d, l)
    print(d, l) 
    # what will this print?
```



### Concepts 

immutables -> str, int, float, bool,tuple
Tuple with mutable element is mutable 

mutables -> list, dict, set 

zip, enumerate, dict.items(), dict.keys(), dict.values() 

Variables as boxes 

Mutable function arguments

static vs classmethod

super()

Yield and generators

Listcomp, dictcomp, genexp

First class functions

*args **kwargs

Decorator

Context manager

coroutines, yield from 

async await, event-driven programming

asyncio, event loop 

logging

pytest

black

mypy

Dataclass, tuple, dict, named tuple 

Collections, Counter, defaultdict, deque, OrderedDict

multiprocessing, Pool, ThreadPool

Itertools, combinations, chain, islice, count, cycle, repeat, groupby, starmap 


### Drawbacks

Lack of static typing 

Slow

GIL 

Not good at concurrency as node or go 

### The Zen of Python

Beautiful is better than ugly.

Explicit is better than implicit.

Simple is better than complex.

Complex is better than complicated.

Flat is better than nested.

Sparse is better than dense.

Easy to explain 

One obvious way to do it

Errors should never pass silently.

practicality

Readability counts.

Now is better than never.
Although never is often better than *right* now.


## Behavioral 

Think of people you admire during your career, how are they like ?  

What motivates you ?

What is your work style ? discrete, well defined tasks, or just having goal and freedom to choose the way ? 

How do you manage your time?

Example of a time when you had something bothers you at work, and your approach? 
