---
---
update skip locked

select for update

- [Common DB schema change mistakes - Postgres.AI](https://postgres.ai/blog/20220525-common-db-schema-change-mistakes)


## indexes

  CREATE INDEX ON
  USING hash/brin/gist/gin

B-tree: default
Hash: no range queries
GiST (Generalized Search Tree) balanced tree, good for range types like dates, IPs, geometry, text,..
GIN (Generalized Inverted Index): array/JSONB, full-text
BRIN (Block Range Index): sorted data like timestamps

unique
partial: WHERE
composite
covering
