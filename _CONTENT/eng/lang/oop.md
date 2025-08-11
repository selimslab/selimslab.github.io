---
---
pillars:
- encap.
- inher.
- poly.
- abs.

poly: treat objects in a uniform way.
- Compile time: generics or method overloading (one class, same method name, diff. signs)
- Runtime: override parent

solid:
- extend vs modify
- children must not break parent contracts

compose by default, inherit when there's a true is-a hierarchy or template pattern


## DDD
shared language
bounded context, boundaries of the area where terms are relevant
domain models and core logic, independent of technology
alternatives: relational, ux, math

# Patterns

## Create
Singleton: app config, logger, connection pools, hardware interface
Factory and abstract factory: Create one object vs families of related ones.
Builder: build step by step, eg. http requests, db queries
Prototype: copy complex objects

## Organize
Adapter: adapt different interfaces
Bridge: abstraction---implementation -> define abst. --- inject impl.
Composite: A tree with a shared interface, like unix files, html dom, AST
Decorator: Wraps an existing object and adds sth. to it. eg. middlewares, validation, telemetry
Facade: abstract a complex object
Flyweight: Share objects. eg. fonts, game assets, map tiles
Proxy: Controls access to an object. Has the same interface. eg. permissons, caching, lazy-loading

## Behave
Observer: observe/notify state changes. Loose coupling.
Command: Represent ops with objects. Decouple command from execution. Can save, queue, undo, etc.
Memento: remember a past state
Mediator: central hub
Template Method: template of funcs
Chain of Responsibility: step by step operations
Strategy: runtime choice
State: state machine, enums
Visitor: add new behavior without modifying the objects. eg. formatters, parsers, compilers
Interpreter: define a grammar and parse it. eg. sql, regex, languages
