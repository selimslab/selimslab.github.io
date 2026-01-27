---
---
```
poly: treat in a uniform way
    generics
    interfaces 
    inheritance, override, overload 

    compile-time vs runtime 
```

## patterns 
```
create
    singleton: app config, logger

    factory, abs. fac: dep. inj. 

    builder: http requests, db queries
    proto: copy 

org 
    adapter 
    facade 

    bridge: independent abstractions 
    composite tree: unix files, html dom, AST

    flyweight: fonts, game assets, map tiles

    decorator: middlewares, validation, telemetry
    proxy: control access, eg. permissons, caching, lazy-loading

behave 
    command: save, queue, undo
    state: enum, state machine 
    memento: history
    observer: pubsub 

    strategy: runtime choice
    chain: steps
    template 

    mediator: hub 
    interpreter: parse n eval eg. sql, regex, dsl
    visitor: add new behavior without modifying, eg. formatters, parsers, compilers 
```