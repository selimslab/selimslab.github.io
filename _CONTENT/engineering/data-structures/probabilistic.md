---
---

Here are the key probabilistic data structures and their use cases:

1. Bloom Filter
- Space-efficient set membership testing
- Can have false positives but no false negatives
- Use cases: cache filtering, spell checkers, duplicate detection

2. Count-Min Sketch
- Frequency estimation of elements in a stream
- Uses multiple hash functions and a 2D array
- Trade-offs accuracy for space efficiency
- Use cases: network traffic analysis, stream processing

3. HyperLogLog
- Cardinality estimation (count unique elements)
- Uses bit pattern observations
- Accuracy within 2% with minimal memory
- Use cases: unique visitor counting, database query optimization

4. MinHash
- Estimates similarity between sets
- Based on the Jaccard similarity coefficient
- Use cases: document similarity, duplicate detection

5. Skip List
- Probabilistic alternative to balanced trees
- Expected O(log n) operations
- Simpler implementation than balanced trees
- Use cases: in-memory indexes

6. Quotient Filter
- Similar to Bloom filter but supports deletion
- Better cache locality
- Use cases: element tracking with deletions

7. t-digest
- Estimates quantiles in streaming data
- Adaptive precision (more precise near edges)
- Use cases: percentile calculations, anomaly detection

8. Random Trees
- Probabilistic hierarchical structures
- Examples: Random Forest, LSH Forest
- Use cases: search, classification, clustering

Key properties:
- Sub-linear space complexity
- Approximate answers
- Tunable accuracy vs space/time trade-offs
- Suitable for streaming data
- Handle high-throughput scenarios
