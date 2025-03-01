---
---


Splits large tables/databases into smaller, manageable pieces while maintaining logical unity.

## Types

1. **Horizontal (Sharding)**
   - Splits rows across partitions
   - Each partition has same schema, different data
   ```sql
   -- Customer table partitioned by region
   Partition 1: Customers (ID 1-1000) → US West
   Partition 2: Customers (ID 1001-2000) → US East
   ```

2. **Vertical**
   - Splits columns across partitions
   - Common: separate rarely used/large columns
   ```sql
   Partition 1: Customer(id, name, email)
   Partition 2: Customer(id, address, profile_photo)
   ```

3. **Functional**
   - Splits data by function/workload type
   - Separates different database operations
   ```sql
   -- Example: Order system
   DB1: order_read_replica (SELECT queries)
   DB2: order_write_primary (INSERT/UPDATE)
   DB3: order_analytics (Reporting/Analytics)
   ```
   - Common uses:
     - Read/Write separation
     - OLTP vs OLAP workloads
     - Hot vs Cold data
     - Real-time vs Batch processing

## Partition Keys
- Date/Time (e.g., logs by month)
- Geographic (e.g., users by country)
- ID ranges
- Hash of values

## Benefits
- Better performance (parallel queries)
- Improved availability
- Easier maintenance
- Reduced index size
- Better data locality

## Tradeoffs
- Complexity in queries spanning partitions
- Overhead in maintaining partition scheme
- Potential hotspots if partition key poorly chosen
- Join performance across partitions

## Example
```sql
-- PostgreSQL range partitioning
CREATE TABLE sales (
    sale_date date,
    amount decimal
) PARTITION BY RANGE (sale_date);

CREATE TABLE sales_2023 
    PARTITION OF sales 
    FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE sales_2024 
    PARTITION OF sales 
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```

