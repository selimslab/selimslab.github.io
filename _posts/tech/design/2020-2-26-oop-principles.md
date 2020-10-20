---
layout: post
title: OOP and SOLID 
tags: software-design
category: tech
---
OOP has been a very useful paradigm 

# 4 pillars of OOP 

# Abstraction
boxes inside boxes 

# Encapsulation
Hide data and selectively reveal

# Inheritance 
Create parent child relationships 

Creates an "is-a" relationship. 

For example if Mars inherits from a Planet, Mars <b>is a</b> planet 

# Polymorphism 
Means many shapes, makes it easy to adapt

Many different classes could have a method with the same name but with a different implementation. 
With polymorphism, every class will execute its correct method. 
 
Polymorphism could be static or dynamic 
Method overloading is used for static polymorphism.
Inheritance + method overriding is used for dynamic polymorphism.


# SOLID 

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

also visit 

[SOLID Principles: Explanation and examples - ITNEXT](https://itnext.io/solid-principles-explanation-and-examples-715b975dcad4)
