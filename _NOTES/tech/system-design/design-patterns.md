---
title: Design Patterns
---

Some common use cases 

## Creational

### Singleton
- DB connection pools - thread safety, max connections
- App config - env vars, feature flags, settings
- System logger - centralized logging, rotation
- Hardware interface - serial port, USB access
- Cache manager - in-memory LRU, size limits

### Factory
- DB drivers - MySQL/PostgreSQL instances, configs
- Payment services - merchant credentials, API keys
- Document parsers - format-specific validation
- Auth providers - OAuth clients, scopes, endpoints
- UI components - platform-specific widgets, styling

### Builder
- HTTP client - timeout, retries, headers, middleware
- Server config - ports, SSL, rate limits, CORS
- Report generator - headers, sections, charts
- Email composer - templates, attachments, tracking
- Query builder - SQL joins, conditions, sorting

### Prototype
- Doc templates - invoice/contract cloning, fields
- Game objects - enemy/item spawning, modifiers
- Test data - sample users/orders generation
- UI components - widget cloning, state preservation
- Env configs - dev/staging/prod settings, overrides

## Structural

### Adapter
- API compatibility: SOAP→REST, XML-RPC→gRPC, old→new
- DB abstraction: SQL/NoSQL ops, query translation
- Payment gateways: Stripe/PayPal/Square unified interface
- Storage: S3/GCS/Azure common operations
- Auth: OAuth/SAML/JWT standardization

### Decorator
- HTTP middleware - compression, rate limiting, auth, metrics
- Stream processing - encryption, buffering, checksums
- Data validation - schema checking, sanitization, transformation
- UI components - theming, accessibility, analytics tracking
- Database queries - caching, retry logic, connection pooling

### Facade
- Payment processing - abstract order/payment/shipping/inventory
- ML model deployment - simplify training/validation/inference
- Multi-API operations - combine auth/user/billing services
- DevOps workflows - unite build/test/deploy/monitor
- Media processing - abstract encode/transform/store/serve

### Composite
- Document object model - HTML/XML tree structures
- UI component trees - nested containers/layouts
- File system operations - recursive directory handling
- Expression trees - AST for query/rule engines
- Graphics scenes - hierarchical transformations

### Proxy
- Image loading - lazy load high-res versions
- API gateway - rate limiting, caching, auth
- Database - connection pooling, query monitoring
- Virtual lists - paginated data loading
- Service mesh - traffic management, security

### Flyweight
- Text rendering - shared font/style objects
- Game assets - pooled particles/sprites
- Data tables - shared cell formats
- Map tiles - cached terrain chunks
- UI themes - shared style definitions

## Behavioral

### Observer
- Event tracking system - analytics, user behavior monitoring
- Trading platform - price alerts, portfolio updates
- IoT sensor network - temperature/humidity monitoring
- CI/CD pipeline - build status notifications
- Cache invalidation - distributed cache updates

### Strategy
- Image compression - JPEG/PNG/WebP with quality settings
- Sort algorithms - quicksort/mergesort based on data size
- Tax calculation - country-specific tax rules
- Path finding - A*/Dijkstra based on graph properties
- Data storage - in-memory/disk/remote based on size

### Command
- Video editor - cut/trim/merge operations
- Drawing app - brush strokes, shape creation
- Shell commands - command history, script execution
- Database transactions - atomic operations
- GUI actions - keyboard shortcuts, menu items

### Template Method
- API response handling - parse/validate/transform/cache
- PDF generation - header/content/footer/metadata
- Data import - validate/clean/transform/load
- Unit test setup - prepare/execute/verify/cleanup
- Email processing - scan/filter/categorize/store

### Mediator
- Smart home system - device coordination
- Trading platform - order matching engine
- Form validation - cross-field dependencies
- Multiplayer game - player interaction/combat
- Workflow engine - task dependencies

### Memento
- Code editor - snapshot/restore text state
- Image editor - operation history
- Shopping cart - session state management
- Browser history - navigation state
- Game engine - save/load system

### Chain of Responsibility
- Input validation - type/format/business rules
- Image processing - resize/filter/compress/optimize
- Payment processing - fraud/balance/limit checks
- Access control - authentication/role/permission
- Request handling - rate limit/cache/auth/route

### State
- Media player - play/pause/stop/seeking
- Job scheduler - pending/running/completed/failed
- User session - guest/authenticated/admin
- File transfer - init/transfer/verify/complete
- Order system - created/paid/shipped/delivered

### Visitor
- Code formatter - different language styles
- JSON/XML parser - custom node processing
- Compiler - AST optimization passes
- Report generator - HTML/PDF/CSV export
- File system - size/permission scanning

### Interpreter
- Search query parser - elasticsearch/solr syntax
- Template engine - variable/loop/conditional
- Math expression parser - arithmetic operations
- Regex engine - pattern matching rules
- Shell script interpreter - command execution