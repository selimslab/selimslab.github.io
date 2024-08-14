---
---

Postgres, MySQL, ..

Usually requires extensions and helpers to setup 

## Follower Failure 

1. Get a snapshot from a leader 
2. Get changes since the snapshot 

## Leader Failure 

More tricky 

1. Detect the leader is down 
2. Elect a new leader 
3. Make sure each node recognizes the new leader and the old leader accepts that its a follower now 


## Lag Problems 

1. Read your writes 
2. Monotonic reads, you should not read an older value than they have seen 
3. Consistent prefix reads, preserving order of writes, thus causality 

Transactions in a single node db solves them yet we need application level mechanisms for distributed nodes although they are complex and error-prone 
