---
---
⏺ Here are the top practical SQL advanced querying concepts:

  • CASE statements - Use WHEN/THEN/ELSE logic to conditionally transform column values in
  queries

  • GROUP BY aggregation - Split data into groups and summarize with COUNT, SUM, AVG, MIN,
  MAX per group

  • Window functions - Apply calculations across row sets while returning values for each row
   (unlike GROUP BY which returns one row per group)

  • ROLLUP/CUBE extensions - Add subtotals and grand totals to GROUP BY results automatically

  • ROW_NUMBER/RANK ranking - Assign sequential numbers or ranks to rows within partitions

  • LAG/LEAD functions - Access previous or next row values within ordered partitions

  • Moving averages - Calculate rolling averages using ROWS BETWEEN with window functions

  • Running totals - Compute cumulative sums using UNBOUNDED PRECEDING

  • PIVOT operations - Transform row values into columns (Oracle/SQL Server)

  • Subqueries with window functions - Filter results based on window function calculations

  JOINS - Combine Columns
  - INNER JOIN: Returns matching rows only
  - LEFT JOIN: All left table rows + matching right rows (NULL for missing)
  - RIGHT JOIN: All right table rows + matching left rows
  - FULL OUTER JOIN: All rows from both tables
  - CROSS JOIN: All row combinations (Cartesian product)
  - Use table aliases for cleaner syntax: FROM table1 t1 JOIN table2 t2
  - Join on multiple columns: ON t1.col1 = t2.col1 AND t1.col2 = t2.col2
  - USING shortcut for same column names: USING (column_name)

  UNION OPERATORS - Combine Rows
  - UNION: Combines results, removes duplicates
  - UNION ALL: Combines results, keeps duplicates (faster)
  - EXCEPT/MINUS: Subtracts one result set from another
  - INTERSECT: Returns common rows between queries
  - Must match: column count, data types
  - Column names taken from first query

  COMMON TABLE EXPRESSIONS (CTEs)
  - WITH clause creates temporary result sets
  - More readable than subqueries for complex queries
  - Can reference CTE multiple times in same query
  - Recursive CTEs for hierarchical data and sequences
  - Better for multiple table operations vs nested subqueries

  Performance Tips
  - Use UNION ALL when no duplicates possible
  - LEFT JOIN more common than RIGHT JOIN
  - Be cautious with NATURAL JOIN (auto-joins all matching columns)
  - CTEs improve readability but subqueries work in older systems