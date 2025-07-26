


---

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




