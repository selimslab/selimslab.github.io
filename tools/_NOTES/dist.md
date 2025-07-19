


# db scaling 

read replicas: writer vs readers. psql streaming replication, mysql master-slave 

Vertical: split columns to multiple tables in the same db. 

Horizontal: split to different dbs. shards. 
cross shard joins become expensive. 

## distributed transactions 

2pc: coordinator asks all, commits if they all ack. blocked if leader fails. 
saga: commit or compensate(roll-back) 

the core problem is consensus. etcd or zk solves it, eg. for kafka or k8s. 

