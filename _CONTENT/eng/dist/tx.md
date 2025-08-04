---
---
## distributed tx 

2pc: coordinator asks all, commits if they all ack.

saga: commit or compensate(roll-back) 

the core problem is consensus. etcd or zk solves it, eg. for kafka or k8s

