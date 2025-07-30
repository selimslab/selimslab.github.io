---
---
## patterns 

cache aside: app manages cache and db 

read-through: app talks to cache only. cache reads db 

write-through: write to cache&db in sync 

write-behind: write to cache first, db async 

