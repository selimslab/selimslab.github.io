---
layout: post
title: Python Interview
tags: tech 
---

Some concepts to evaluate a candidate's depth in python  

## Python

what will this print?

```python
def foo(d, l):
    d[3] = 7
    l.append(5)

def bar():
    d = {3: 4}
    l = []
    foo(d, l)
    print(d, l) 

bar()
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


