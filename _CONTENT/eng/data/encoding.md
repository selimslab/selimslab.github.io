---
---
## Unicode
a standard to encode text. 

It assigns unique code points to characters.   

5: U+0035    
A: U+0041

UTF: Unicode Transformation Format  
UTF-8: uses 8-bit blocks. one byte for ascii, up to 4 bytes for the rest.   

## formats 

language-specific: eg. python pickle     
text: eg. json, csv    
binary: compact. eg. protobuf, thrift, avro 

avoid lang specific formats 

binary formats for internal  eg. protobuf, thrift, avro for dynamic schemas  

json/xml for external apis 

generate schemas from codebase 

consider bw/fw comp.

## compatibility 
bw: new code, old data 
fw: old code, new data

think before adding, it's easy to add, hard to remove 

preserve unknown fields to prevent data loss when old code reads new data 

use field tags instead of names. more compact encoding and enables renaming fields 

plan for rolling upgrades, old and new running together 

default values enable safe schema changes. they enable adding new optional fields w/o breaking old readers 



  