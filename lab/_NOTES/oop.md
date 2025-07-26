---
title: OOP
---


## Pillars 

Encap: protect data 
Inh: create a hierarchy 
Poly: Treat objects in a uniform way
- Compile time: generics or method overloading 
- Runtime: override parent 
Abstraction: simple interface of a complex sys

## SOLID
Do one thing 
Open to extension, closed to modification 
Children must not break parent contracts
Separate interfaces
Inject deps 

## Composition vs inheritance 

Composition is generally more robust and flexible 

Inheritance can be better when there is a true is-a hierarchy or for template pattern


## Design Patterns

### Create 
Singleton: app config, logger, connection pools, hardware interface 

Factory and abstract factory: Create one object vs families of related ones. 

Builder: build step by step, eg. http requests, db queries

Prototype: copy complex objects

### Organize

Adapter: adapt different interfaces 

Bridge: abstraction---implementation -> define abst. --- inject impl. 

Composite: A tree with a shared interface, like unix files, html dom, AST

Decorator: Wraps an existing object and adds sth. to it. eg. middlewares, validation, telemetry

Facade: abstract a complex object 

Flyweight: Share objects. eg. fonts, game assets, map tiles

Proxy: Controls access to an object. Has the same interface.  eg. permissons, caching, lazy-loading


### Behave 

Observer: observe/notify state changes. Loose coupling. 

Command: Represent ops with objects. Decouple command from execution. Can save, queue, undo, etc. 

Memento: remember a past state 

Mediator: central hub 

Template Method: template of funcs 

Chain of Responsibility: step by step operations

Strategy: runtime choice 

State: state machine, enums 

Visitor: add new behavior without modifying the objects. eg. code formatters for different langs, parsers for diff. doc formats, compiler for diff AST nodes

Interpreter: define a grammar and parse it. eg. sql, regex, languages