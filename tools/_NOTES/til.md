


<https://diataxis.fr/>

ref
exp 
howto
tutorial

---

redis shards by hash slots, clients route 

CRC16(key) % 16384

hash tags user:{123}:profile -> {123} is tag, tags go to same shard 

---

spatial indexes 

tree-based: r-tree, quad tree

grid based

hash based: geohash, s2 

specialized: locality sensitive hash 


---

maps 

64 bit s2 id 
project to cube faces 
compact, fast distance calc.


vector tiles: 
divide map to tiles at different zoom levels (0-22) 
each level doubles the tile count. 
find tiles by z/x/y zoom/col/row


---

OpenTelemetry → Prometheus (metrics) + Loki (logs) + Jaeger (traces) → Grafana (visualization)

loki compresses logs, indexes tags only. grep only. no full text search 

---

b+ trees 

all data in leaves. 

one node = one disk page (4kb)

leaves are linked for range queries 

b for file sys
b+ for dbs


---

lsm vs b-tree r/w 

b: 50k wps, 100k rps
lsm: 10x w, 0.5x r 
---

wc-stores 

Cassandra, HBase, BigTable, DynamoDB

---

lsm tree 

write -> wal -> mem-table(skip-list) -> flush to sstable 

flush by blocks, index while writing 
1. in-memory sparse index: only first key of each block 
2. a block index for each
3. a bloom filter for entire sstable 

data blocks - sparse index - block indexes - bloom filter 


---

cloud vs on-prem for dbs: cloud is 2-3x costlier yet starts to make sense after 50-100TB

---

idempotence 

comm. 


