---
---
update skip locked 

select for update 



  ⏺ PostgreSQL Index Examples

  B-tree (Default)
  CREATE INDEX idx_users_email ON users (email);
  CREATE INDEX idx_orders_date ON orders (created_at DESC);

  Composite
  CREATE INDEX idx_orders_user_date ON orders (user_id,
  created_at);

  Partial
  CREATE INDEX idx_active_users ON users (email) WHERE active =
  true;

  Expression
  CREATE INDEX idx_users_lower_email ON users (lower(email));
  CREATE INDEX idx_orders_total ON orders ((price * quantity));

  Unique
  CREATE UNIQUE INDEX idx_users_email_unique ON users (email);

  GIN (JSON/Arrays)
  CREATE INDEX idx_products_tags ON products USING gin (tags);
  CREATE INDEX idx_users_metadata ON users USING gin (metadata);

  GiST (Full-text)
  CREATE INDEX idx_articles_search ON articles USING gist
  (to_tsvector('english', content));

  Hash
  CREATE INDEX idx_users_id_hash ON users USING hash (user_id);

  BRIN (Large Tables)
  CREATE INDEX idx_logs_timestamp ON logs USING brin (created_at);

  Covering Index
  CREATE INDEX idx_orders_cover ON orders (user_id) INCLUDE
  (total, status);

---

  Standard Indexes

  - B-tree - Default index for equality/range queries, supports
  ordering
  - Hash - Fast equality lookups only, no range queries
  - GiST (Generalized Search Tree) - Extensible for geometric
  data, full-text search
  - GIN (Generalized Inverted Index) - Best for array/JSONB
  searches, full-text
  - SP-GiST (Space-Partitioned GiST) - Non-balanced trees for
  clustered data
  - BRIN (Block Range Index) - Minimal storage for naturally
  ordered large tables

  Specialized Types

  - Partial - Index with WHERE clause to reduce size
  - Expression - Index on computed expressions/functions
  - Unique - Enforces uniqueness constraint
  - Composite - Multi-column indexes
  - Covering - INCLUDE non-key columns for index-only scans

  Practical Usage

  - B-tree: 95% of use cases (numbers, text, dates)
  - GIN: JSON/array searches, full-text search
  - GiST: Geometric queries, text similarity
  - BRIN: Time-series data, append-only tables
  - Hash: Simple equality when no sorting needed


---


⏺ BRIN (Block Range Index)

  What it is:
  - Stores min/max values for groups of table pages (blocks)
  - Tiny storage footprint vs regular indexes
  - Works best with naturally ordered/correlated data

  How it works:
  -- Table with time-series data
  CREATE TABLE logs (
    id SERIAL,
    timestamp TIMESTAMPTZ,
    message TEXT
  );

  -- BRIN tracks min/max timestamp per block range
  CREATE INDEX idx_logs_time_brin ON logs USING brin (timestamp);

  Storage:
  - Regular B-tree: ~15% of table size
  - BRIN: ~0.1% of table size (150x smaller)

  Best for:
  - Time-series data (timestamps naturally ordered)
  - Auto-incrementing IDs
  - Append-only tables
  - Large tables with natural correlation

  Performance:
  - Good: Range queries on correlated data
  - Bad: Random lookups, equality searches
  - Terrible: Frequently updated data

  Example use cases:
  -- Time-series logs
  SELECT * FROM logs WHERE timestamp > '2024-01-01';

  -- Sequential IDs
  SELECT * FROM orders WHERE order_id BETWEEN 1000000 AND 2000000;

  -- Geographic data (if spatially clustered)
  CREATE INDEX idx_locations_brin ON locations USING brin
  (latitude, longitude);

  Key insight: BRIN trades query speed for storage efficiency on
  naturally ordered data.

---


  Data Types Mastery:
  - Use text over varchar for flexibility - both have 1GB max
  - Choose bigserial for auto-incrementing primary keys
  - Prefer jsonb over json for performance and indexing
  - Use timestamptz for timezone-aware datetime storage

  Text & String Operations:
  - Master string_to_array() + unnest() for parsing delimited data
  - Use string_agg() for aggregating multiple values
  - Leverage PostgreSQL's superior regex support with regexp_replace()
  - Apply split_part() for extracting specific segments

  Arrays & Collections:
  - Every type has array equivalent - use array_agg() for aggregation
  - Expand arrays with unnest() to convert back to rows
  - Index arrays with GIN for fast containment queries
  - Use operators: && (overlap), @> (contains), <@ (contained by)

  JSON/JSONB Navigation:
  - Navigate with -> (JSON) and ->> (text output)
  - Use path arrays with #> for deep object traversal
  - Index jsonb columns with GIN for performance
  - Edit with operators: || (merge), - (remove), #- (nested remove)

  Range Types:
  - Replace start/end column pairs with single range columns
  - Use proper notation: [) for half-open, [] for closed ranges
  - Index with GiST for optimal range query performance
  - Query with && (overlap) and @> (contains) operators

  Full Text Search:
  - Create tsvector columns with to_tsvector() configurations
  - Weight fields A-D (highest to lowest) with setweight()
  - Index tsvectors with GIN, use triggers for auto-updates
  - Rank results with ts_rank() for relevance scoring

  Performance Essentials:
  - Use GIN indexes for arrays, jsonb, and full-text search
  - Use GiST indexes for range types and geometric data
  - Specify FTS configurations explicitly for 2x performance boost
  - Generate test data efficiently with generate_series()

---

  Tables

  - Use serial or IDENTITY for auto-incrementing primary keys - IDENTITY is more
  standard-compliant and table-tied
  - Leverage inherited tables for data partitioning where child tables inherit
  parent structure and constraints
  - Use partitioned tables (PostgreSQL 10+) for better data organization with
  automatic routing and non-overlapping ranges
  - Create UNLOGGED tables for ephemeral data to gain 10-15x faster writes at cost
  of crash recovery
  - Use TYPE OF to create tables from composite data types for consistent structure
   across multiple tables

  Constraints

  - Always add indexes manually for foreign key constraints - PostgreSQL doesn't
  auto-create them
  - Use check constraints for data validation and query planner optimization
  - Implement exclusion constraints with overlap operators for scheduling and
  preventing conflicts
  - Apply partial uniqueness through exclusion constraints when standard unique
  constraints are insufficient

  Indexes

  - B-Tree works for most cases but choose specialized indexes for specific data
  types and queries
  - Use text_pattern_ops operator class for columns with frequent LIKE/ILIKE
  searches
  - Create functional indexes on expressions like upper(column) for
  case-insensitive searches
  - Implement partial indexes with WHERE conditions to save space and improve
  performance on subset data
  - Let PostgreSQL's bitmap index scan combine single-column indexes rather than
  creating every possible compound index
  - Consider index-only scans by including all query-needed columns in compound
  indexes