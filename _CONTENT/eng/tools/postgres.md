---
---
```
update skip locked
select for update

indexes
    B-tree: General purpose, equality/range queries
    GIN: Containment queries on composite values
    GiST: Spatial/geometric queries and extensible predicates
    BRIN: Range queries on naturally ordered large datasets

CREATE INDEX idx_name ON table USING brin (column)

unique
partial: WHERE
multi-column composite
```