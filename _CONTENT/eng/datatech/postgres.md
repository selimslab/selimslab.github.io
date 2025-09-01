---
---
update skip locked
select for update

## tx
```
SET TRANSACTION ISOLATION LEVEL
READ COMMITTED
REPEATABLE READ
SERIALIZABLE
```

## indexes
B-tree: General purpose, equality/range queries
GIN: Containment queries on composite values
GiST: Spatial/geometric queries and extensible predicates
BRIN: Range queries on naturally ordered large datasets

`CREATE INDEX idx_name ON table USING brin (column)`

unique
partial: WHERE
multi-column composite

## links
[Common DB schema change mistakes - Postgres.AI](https://postgres.ai/blog/20220525-common-db-schema-change-mistakes)

[SQLforDevs.com - Database Tips & Tricks](https://sqlfordevs.com/tips)


## PostgreSQL Slowdown Techniques

Parameter mismanagement can destroy performance without touching schema or queries.

I/O Threading: Restrict to single worker thread
Buffer Cache: Reduce shared_buffers to force disk reads (99.9% → 70% cache hit rate)
Autovacuum: Set aggressive thresholds to create constant background churn
WAL: Force frequent flushes and tiny segments for millisecond checkpoints
Query Planner: Set random_page_cost extremely high to disable index usage

Result: 7,082 TPS → 0.016 TPS through configuration alone

