---
---
## time-series 



## spatial 

tree-based: r-tree, quad tree

grid based

hash based: geohash, s2 

specialized: locality sensitive hash 

# Map data

1. vector data: geojson
2. tiles: vector tiles, raster tiles(static imgs)


## vector data
...


## tiles

vector tiles: 
divide map to tiles at different zoom levels (0-22) 
each level doubles the tile count. 
find tiles by z/x/y zoom/col/row




## s2
64 bit id 
project to cube faces 
compact, fast distance calc.




  Spatial:
  - R-tree, Quad tree (tree-based)
  - Grid-based indexing
  - Geohash, S2 (hash-based)
  - Locality Sensitive Hash

  Time-Series:
  - Time-series specific indexes (mentioned but not
  detailed)

  Key-Value:
  - Hash indexes (O(1) lookups)
  - Skip lists (Redis sorted sets)
  - B-tree/B+ tree

  PostgreSQL Specialized:
  - GIN (arrays, JSONB, full-text)
  - GiST (ranges, geometric data)
  - Bloom filters
  - Functional/Partial indexes

  LSM Tree:
  - Bloom filters for SSTable membership
  - Sparse and block indexes


⏺ GIN (Generalized Inverted Index) is a PostgreSQL index
   type designed for composite values where each item
  can contain multiple component values.

  How it works:
  - Creates entries for each component value pointing
  back to the heap tuple
  - Like an inverted index in search engines - maps
  values to locations

  Best for:
  - Arrays (@>, &&, <@ operators)
  - JSONB documents
  - Full-text search (tsvector)
  - Any data type with multiple searchable elements

  Example:
  CREATE INDEX idx_tags ON posts USING GIN (tags);
  -- Fast queries like: WHERE tags @> ARRAY['postgres', 
  'database']

  Performance:
  - Excellent for containment queries
  - Slower updates than B-tree (must update multiple
  entries)
  - Larger index size but very fast searches

  GIN is PostgreSQL's go-to index for "find rows
  containing X" scenarios.


⏺ GiST (Generalized Search Tree) is a PostgreSQL index
  type that's a balanced tree structure designed for
  custom data types and complex queries.

  How it works:
  - Extensible framework - supports custom operators and
   data types
  - Uses predicates (conditions) rather than exact key
  matching
  - Tree nodes contain predicates that describe all
  entries in subtrees

  Best for:
  - Range types (daterange, numrange)
  - Geometric data (points, polygons, circles)
  - Network addresses (inet, cidr)
  - Text similarity searches
  - Custom data types with spatial/ordering properties

  Key operators:
  - && (overlap)
  - @> (contains)
  - <@ (contained by)
  - << >> (left/right of)

  Example:
  CREATE INDEX idx_dates ON events USING GiST
  (event_period);
  -- Fast: WHERE event_period && 
  '[2024-01-01,2024-12-31)'

  Performance:
  - Good for range and proximity queries
  - Supports nearest-neighbor searches
  - More flexible than B-tree but can be slower for
  exact matches

  GiST is PostgreSQL's framework for "complex
  relationship" queries.