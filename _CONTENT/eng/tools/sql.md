---
---
```
types 
    varchar
    text
    ...

constraints 
    pk
    fk

    not null
    check: for data ranges and formats
    uniq

3NF

index
    FKs
    composite index for multi column queries

    materialized views

partition by logical boundaries like date, region, ..

evolve 
    new columns 
        nullable
        version field

    soft delete

audit trail

CASE: WHEN/THEN/ELSE
GROUP BY: COUNT, SUM, AVG, MIN, MAX per group
CTE: WITH

window func
moving avg
lag/lead
running sum
pivot
```