---
---
encap.
inher.
abs.

poly
treat in a uniform way
compile time: generic or overloading
runtime: override parent

solid
extend
honor parent contracts

compose by default
inherit when real is-a hierarchy or template pattern

DDD
shared domain language
bounded context: area of terms
domain models and core logic, independent of technology
alternatives: relational, ux, math

# Patterns

## Create
Singleton: app config, logger, connection pools, hardware interface

Factory and abstract factory: Create one object vs families of related ones.

Builder: build step by step, eg. http requests, db queries

Prototype: copy complex objects

## Organize
Adapter: adapt interfaces
Facade: simple interface of a complex object

Flyweight: Share. eg. fonts, game assets, map tiles

Bridge: define abstraction, inject implementation
Composite: A tree with a shared interface. eg. unix files, html dom, AST

Decorator: Wrapper. eg. middlewares, validation, telemetry
Proxy: Control access. eg. permissons, caching, lazy-loading

## Behave
Command: Decouple command from execution. eg. save, queue, undo

Memento: remember a past state
State: state machine, enums
Observer: observe/notify state changes

Mediator: central hub

Template Method: template of funcs
Chain of Responsibility: step by step
Strategy: runtime choice

Visitor: add new behavior without modifying objects. eg. formatters, parsers, compilers
Interpreter: define a grammar and parse it. eg. sql, regex, languages
