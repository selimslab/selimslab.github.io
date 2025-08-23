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
