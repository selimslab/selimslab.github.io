---
---
update skip locked 

select for update 

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