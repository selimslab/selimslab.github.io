---
---
## formats
language specific: pickle
text: json, csv
binary: protobuf, thrift, avro

## compatibility
backward: old data, new code
rolling upgrades

breaking:
deleting required fields
changing field types

keep unknown fields
tags vs names: compact + rename later


