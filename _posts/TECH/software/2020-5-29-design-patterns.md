---
layout: post
title: Design Patterns
tags: software     
categories: Tech 
---

Design Patterns are general reusable solutions to commonly occurring problems

They are not silver bullets 



## Creational

How to create an object

1. **Simple Factory** -> getClass() 

2. **Factory** Method  -> factory with sub classes, eg. getSubClass1(), getSubClass2() 

3. **Abstract Factory**, factory of factories -> group related factories 

4. **Builder**, burger -> addChilly(), addPickle()

5. **Prototype**, clone -> doc.copy()

6. **Singleton**

## Structural 

How components use each other 

1. **Adapter** 

2. **Bridge**, composition over inheritance, themes -> search engine 

3. **Composite**, polymorphism 

4. **Decorator** -> @staticmethod

5. **Facade**, simple command for a complex operation -> go()

6. **Flyweight**, share objects -> sharing docs 

7. **Proxy**

## Behavioral

How components talk to each other 


1. **Chain of Responsibility**, bank, PayPal, bitcoin 

2. **Command**, remote control, waiter, transaction system, roll back  

3. **Iterator** -> python is all bout iteration 

4. **Mediator**, WhatsApp, bank transfer, client-server

5. **Memento**, remember, editor, ctrl+z 

6. **Observer**, job alerts, stock alerts , email alerts 

7. **Visitor**, open/closed, car parts check, AST 

8. **Strategy**, sorting strategy 

9. **State**, editor state, bold, italic

10. **Template** Method, ABC 

for more -> [An ultra-simplified explanation to design patterns](https://github.com/kamranahmedse/design-patterns-for-humans)
