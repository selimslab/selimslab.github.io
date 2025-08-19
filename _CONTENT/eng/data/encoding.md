---
---
## unicode
a standard to encode text.
a unique code point per char
5: U+0035
A: U+0041

UTF: Unicode Transformation Format
UTF-8: uses 8-bit blocks. one byte for ascii, up to 4 bytes for the rest.

## formats
language-specific: eg. python pickle
text: eg. json, csv
binary: eg. protobuf, thrift, avro

## compatibility
backward: old data, new code

breaking:
deleting required fields
changing field types

unknown fields: don't drop them
field tags: instead of names. more compact encoding. you can rename fields
plan for rolling upgrades. old and new running together
