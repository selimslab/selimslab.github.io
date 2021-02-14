---
layout: post
title: OOP and SOLID 
tags: software
category: tech
---

## OOP 

**Abstraction**, you don't have to know all the internals to use something. 

**Encapsulation**, selectively reveal data so only relevant parts has that data 

**Inheritance**, is-a relationships, for example Mars <b>is a</b> planet so Mars can inherit from Planet 

**Polymorphism**, many forms, 

enables to use the same method name for many purposes, 

having multiple implementations for a single interface, or making behavior dynamic 

Many different classes could have a method with the same name 
but with a different implementation. 

With polymorphism, every class will execute its correct method. 
 
Could be done using method overloading or inheritance+overriding


## SOLID 

**Single responsibility principle**, Do one thing, and do it well 

**Open/closed principle,** Classes should be open for extension but closed for modification

**Liskov’s Substitution Principle**, If you change a class with one of its children, 

the program should still work correctly. 

So child classes should not violate the contracts of parents. 

Inheritances should pass the ‘Is-A’ test. 

**Interface Segregation Principle**, Many specific interfaces are better than one general interface

**Dependency Inversion Principle**, provide dependencies from outside because it makes testing easier 

also visit 

[SOLID Principles: Explanation and examples - ITNEXT](https://itnext.io/solid-principles-explanation-and-examples-715b975dcad4)

[Highest Voted 'oop' Questions - Page 3 - Stack Overflow](https://stackoverflow.com/questions/tagged/oop?tab=votes&page=3&pagesize=15)

[oop - What is the difference between an interface and abstract class? - Stack Overflow](https://stackoverflow.com/questions/1913098/what-is-the-difference-between-an-interface-and-abstract-class)

[oop - What is Inversion of Control? - Stack Overflow](https://stackoverflow.com/questions/3058/what-is-inversion-of-control)

[oop - Does functional programming replace GoF design patterns? - Stack Overflow](https://stackoverflow.com/questions/327955/does-functional-programming-replace-gof-design-patterns)
