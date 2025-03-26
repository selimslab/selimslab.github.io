---
---
The relational database model is powerful (data normalization, declarative constraints, physical independence), but SQL specifically has three fatal flaws:

1. **Inexpressive** - Can't express many common patterns, requires verbose syntax for simple operations, and small changes often need complete query restructuring

2. **Incompressible** - No ability to create reusable abstractions, libraries, or higher-order functions

3. **Non-porous** - Poor integration with application code, forcing string concatenation for queries and complex application layers

These flaws have significant industry consequences: stunted database innovation, vulnerable security practices, and the rise of alternative (often inferior) database paradigms.

A better query language would use modern language design patterns, support proper abstraction, integrate cleanly with applications, and maintain a simple, complete specification.

<https://www.scattered-thoughts.net/writing/against-sql/>