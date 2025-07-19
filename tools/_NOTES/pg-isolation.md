
## MVCC
each tx gets a snapshot  xmin, xmax, xid_list

xmin: xid that created the row 
xmax: xid that updated/deleted the row 
xid_list: list of active tx ids

eg. 12340:12350:12342,12345,12347

32 bit tx id

## levels 

read committed

repeatable read, rr: only see data committed before tx began. snapshot isolation. 

SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

serializable: rr + SSI. 
predicate locks + deps graph cycle detection
20% perf cost 

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

predicate lock eg. SELECT * WHERE age > 18 locks the predicate "age > 18"

New rows matching predicate trigger conflicts


Optimistic conc. control is similar to SSI but validates at commit time. who uses it? 

q: can I use pg isolation for multiple shards? 
a: not really. there are 2pc extensions but they block if coordinator dies. 
cockroach has dist tx using raft. 10-100x perf cost. needs quorum
spanner does 2pl + mvcc + sync. clocks

more practical is serializable in node, read committed across shards 




