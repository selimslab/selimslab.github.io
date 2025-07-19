

# vim

## modes 

insert i a o 

cmd : 

normal esc

visual v

## normal mode 

cut d
yank y 
paste p 

w word 
dd yy line 
dw yw word 
3dd 
5yy yank 5 lines  

0 start of line 
$ end of line 

## visual mode 

V or shift+v: select entire line 

search / 


# db scaling 

read replicas: writer vs readers. psql streaming replication, mysql master-slave 

Vertical: split columns to multiple tables in the same db. 

Horizontal: split to different dbs. shards. 
cross shard joins become expensive. 


distributed transactions 

2pc: coordinator asks all, commits if they all ack. blocked if leader fails. 
saga: commit or compensate(roll-back) 

the core problem is consensus. etcd or zk solves it, eg. for kafka or k8s. 


# troubles of dist sys

partial failures 

network 
time 
process   

timeouts   
fencing tokens - incr nums, issued by lock service, nodes must reject older tokens   
consensus 

