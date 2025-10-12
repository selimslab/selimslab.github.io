---
---
key range
hash
hybrid (hashkey, sortkey)

choose partition keys well
hot keys: random prefix/suffix

## rebalancing
fixed: many more parts upfront
dynamic: split large, merge small. good for key-range
hybrid

secondary indexes: local or global
keep related data together to prevent scatter/gather
