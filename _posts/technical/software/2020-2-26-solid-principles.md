---
layout: post
title: SOLID Principles
tags: software 
---

+ S - Single Responsibility Principle
+ O - Open/Closed Principle
+ L - Liskov’s Substitution Principle
+ I - Interface Segregation Principle
+ D - Dependency Inversion Principle

# S — Single responsibility principle
Do one thing, and do it well 

# O — Open/closed principle
Classes should be open for extension but closed for modification

# L - Liskov’s Substitution Principle 
Derived or child classes must be substitutable for their base or parent classes

Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program.

Typical cause is using a wrong abstraction and failing the ‘Is-A’ test of inheritance 

# I - Interface Segregation Principle
Many specific interfaces are better than one general interface
```
interface BadInterface {
    create()   
    read()
}
```     

For example this interface breaks the principle, 
because you would have to implement both create and read

```
interface Create {
    create()  
} 

interface Read {
    read()  
} 
```
This is much better

# D - Dependency Inversion Principle

Depend on abstractions not concretions
```python
class Bad:
    reader = Reader()

    def read(self):
        self.reader.read()
```
bad because reader is concrete

Could be solved by simply providing the dependency as a parameter to the constructor

```python
class Good:
    def __init__(reader):
        self.reader = reader
        
    def read(self):
        self.reader.read()
```
Dependency is injected to the constructor and problem solved!

