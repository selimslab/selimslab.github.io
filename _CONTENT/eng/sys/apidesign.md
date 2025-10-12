---
---
⏺ API Design in System Design Interviews - Core Ideas

  Key Framework

  - 5-minute rule: Don't spend more than 5 minutes on API design during interviews
  - Focus: External client-to-server APIs, not internal microservice communication
  - Default choice: REST (95% of cases)

  REST Fundamentals

  Core Concepts

  - Resources: Map directly to core entities (events, venues, tickets)
  - HTTP methods: GET (retrieve), POST (create), PUT (full update), PATCH (partial update), DELETE (remove)
  - URL structure: Plural nouns for resources, verbs in HTTP methods

  Input Types

  - Path parameters: Required resource identifiers (/events/123)
  - Query parameters: Optional filters (?location=LA&date=2024-01-01)
  - Request body: Data for creation/updates (JSON payload)

  Response Structure

  - Status codes: 2xx (success), 4xx (client error), 5xx (server error)
  - Response body: JSON data, shorthand using core entities

  GraphQL

  Key Benefits

  - Single endpoint: One request for multiple data types
  - Precise data: Clients specify exactly what fields they need
  - Reduced overfetching: Eliminates multiple REST calls

  Trade-offs

  - N+1 problem: Solved with data loaders and batching
  - Complexity: Requires schema resolvers for field-level authorization
  - Less common: Use when mobile optimization or complex data relationships matter

  RPC for Internal Services

  Characteristics

  - Function calls: Direct method invocation over network
  - Binary protocols: gRPC with Protocol Buffers for speed
  - 5-10x faster: Eliminates HTTP overhead, uses compact binary formats
  - Internal only: Not suitable for diverse external clients

  Critical Follow-up Topics

  Pagination

  - Page-based: Simple offset/limit approach (page=1&size=25)
  - Cursor-based: Use last item ID for consistent results with high write volumes
  - When to use: Any endpoint returning large datasets

  Security

  - Authentication: JWT (self-contained) or session tokens (database lookup)
  - Authorization: Role-based access control at endpoint level
  - Header placement: Security tokens in HTTP headers, never in request body
  - User context: Derive user identity from tokens, not request parameters

  Interview Strategy

  - Be concise: Quick progression through API design
  - Use defaults: REST unless specific GraphQL benefits needed
  - Focus externally: Client-facing APIs over internal service communication
  - Shorthand responses: Reference core entities rather than detailed JSON schemas


⏺ API Design Summary

  Core Patterns & Principles

  Authentication vs Authorization
  - Authentication: Who the user is (identity verification)
  - Authorization: What they can access (permission control)

  API Styles & Use Cases
  - REST: Resource-based, HTTP methods, stateless - best for web/mobile
  - GraphQL: Single endpoint, client-specified responses - ideal for complex UIs
  - gRPC: High-performance RPC, protocol buffers - microservices communication

  Protocol Selection

  HTTP/HTTPS: Request-response patterns, status codes, headers
  WebSockets: Real-time bidirectional communication, minimal latency
  AMQP: Message queuing, asynchronous processing
  TCP vs UDP: Reliable/slow vs fast/unreliable delivery

  RESTful Design Best Practices

  Resource Modeling
  - Plural nouns (/products not /product)
  - HTTP methods for CRUD operations
  - Clear URL hierarchies (/products/123/reviews)

  Query Parameters
  - Filtering: ?category=electronics&inStock=true
  - Sorting: ?sort=price_asc
  - Pagination: ?page=2&limit=10 or ?offset=20&limit=10

  Status Codes
  - 2xx: Success (200 OK, 201 Created, 204 No Content)
  - 4xx: Client errors (400 Bad Request, 401 Unauthorized, 404 Not Found)
  - 5xx: Server errors (500 Internal Server Error)

  GraphQL Architecture

  Schema Design: Types, queries, mutations define API contract
  Single Endpoint: Client specifies exact data needs
  Error Handling: Always returns 200, errors in response body
  Avoid: Deep nesting, implement query depth limits

  Security Essentials

  Authentication Types
  - Basic: Username/password (insecure)
  - Bearer tokens: Stateless, scalable
  - OAuth2 + JWT: Third-party authentication
  - Access/refresh tokens: Short-lived security

  Authorization Models
  - RBAC: Role-based (admin, editor, viewer)
  - ABAC: Attribute-based (user/resource/environment conditions)
  - ACL: Resource-specific permission lists

  Protection Mechanisms
  - Rate limiting: Requests per time period
  - CORS: Domain-based access control
  - Input validation: Prevent SQL/NoSQL injection
  - Firewalls: Traffic filtering
  - CSRF tokens: Cross-site request protection
  - XSS prevention: Script injection blocking

  Implementation Process

  Design Phase: Requirements, scope, performance constraints
  Development: Contract-first approach, proper HTTP methods
  Deployment: Testing, monitoring, maintenance
  Versioning: /api/v1, /api/v2 for backward compatibility

  Key Trade-offs

  REST vs GraphQL: Simple/flexible vs complex/precise
  TCP vs UDP: Reliable/slow vs fast/lossy
  Role vs Attribute authorization: Simple/rigid vs complex/flexible
  Public vs VPN APIs: Accessible vs secure




⏺ API Design Core Principles

  Three Design Goals Hierarchy

  1. Functional: Data/service access (baseline connectivity)
  2. Productivity: Reduce learning time, increase developer speed
  3. Experience: Conversion rates, talent retention, brand credibility

  Key insight: Design costs increase up the hierarchy. Choose your goal first—determines ROI and approach.

  The Cano Model for APIs

  - Red line (Expected): Table stakes - data access, basic functionality
  - Yellow line (Linear): Known features like self-service registration, documentation
  - Green line (Delight): Unexpected features that create emotional satisfaction

  Practical approach: Target convention zone for productivity goals. Use imitation as starting point—find similar
  APIs in your domain.

  Design Process Essentials

  Sketch → Prototype → Iterate

  - Start with disposable sketches, NOT code
  - Test assumptions through iteration
  - Conduct heuristic evaluations (design reviews)

  Write Client Code First

  - Critical technique: Write code that CALLS your API during design
  - Not unit tests—actual client applications in target languages
  - Reveals missing data, workflow issues, usability problems
  - Validates design assumptions before implementation

  API Style Selection

  CRUD/REST Style

  - Use when: Building conventional APIs, external users, brand goals
  - Costs: Shared object model, learning overhead, technical debt
  - Design focus: Object relationships, query models, status codes

  GraphQL Style

  - Use when: Known client developers, flexible data needs, showing innovation
  - Costs: Data model complexity, engineering overhead, still has shared understanding
  - Design focus: Data model and RPC endpoints

  Key principle: Styles are tools, not religions. Choose based on context, users, and goals.

  Decision-Making Framework

  1. Reversibility: How costly is changing this decision later?
  2. Standards: Check RFCs and specifications first
  3. Client perspective: Write client code to test options
  4. Make the call: Someone must decide to avoid endless bikeshedding

  Five Cost Categories

  1. Model creation: Time to design
  2. Implementation: Build and operationalize
  3. Client development: User adoption effort
  4. Future changes: Technical debt and evolution
  5. Safety: Security, brand protection, misuse prevention

  Validation Techniques

  - Heuristic evaluation: Structured design reviews using usability criteria
  - Participatory design: Include actual users in design process
  - Blank paper exercise: Ask users to design the API themselves
  - Cross-functional teams: Co-locate API and client developers

  Core principle: Start with people—users, builders, sponsors. Everything flows from understanding human needs and
  constraints.
