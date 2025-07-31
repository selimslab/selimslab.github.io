---
---


## Kafka 

- custom wire protocol, no byte copying 
- batch + pagecache + fsync frequently 
- sendfile syscall to copy directly from pagecache to network 

## spark 

df 

Delta lake table format: parquet + transaction log and metadata  