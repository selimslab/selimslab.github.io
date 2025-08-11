---
---
time-series

vectors

## spatial

tree-based: r-tree, quad tree
grid based
hash based: geohash, s2
specialized: locality sensitive hash

1. vector data: geojson
2. tiles: vector tiles, raster tiles(static imgs)

vector tiles
divide map to tiles at different zoom levels (0-22)
each level doubles the tile count.
find tiles by z/x/y zoom/col/row

s2
64 bit id
project to cube faces
compact, fast distance calc.
