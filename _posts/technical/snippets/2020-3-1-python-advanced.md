---
layout: post
title: Advanced Python 
tags: snippets
---

## Decorators
```python
def foo():
    # do something

def decorator(func):
    # manipulate func
    return func

foo = decorator(foo)  # Manually decorate

@decorator
def bar():
    # Do something
# bar() is decorated
```




## Context Managers

```python
from contextlib import contextmanager

@contextmanager
def custom_open(filename):
    f = open(filename)
    try:
        yield f
    finally:
        f.close()

with custom_open('file') as f:
    contents = f.read()
```

## comprehensions vs generators
```python
# comprehensions create a new list object
filtered_values = [value for value in sequence if value != x]

# generators don't create another list
filtered_values = (value for value in sequence if value != x)

# BAD, needlessly allocates a list of all (gpa, name) entires in memory
valedictorian = max([(student.gpa, student.name) for student in graduates])

# GOOD 
valedictorian = max((student.gpa, student.name) for student in graduates)
```

## Modifying the values in a list¶
It’s safer to create a new list object and leave the original alone.

```python
a = [3, 4, 5]
b = a

# assign the variable "a" to a new list without changing "b"
a = [i + 3 for i in a]
```

## Read From a File
```python
with open('file.txt') as f:
    contents = f.read()
    for line in f:
        print(line)
```

