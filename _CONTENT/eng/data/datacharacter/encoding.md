---
---
binary: protobuf, thrift, avro
text: json, csv
language specific

backward comp: old data, new code

breaking:
deleting required fields
changing field types

keep unknown fields
tags vs names: compact + rename later

rolling upgrades

unicode
a standard to encode text.
a unique code point per char
5: U+0035
A: U+0041

utf8
unicode transformation format
uses 8-bit blocks
one byte for ascii
up to 4 bytes for the rest
