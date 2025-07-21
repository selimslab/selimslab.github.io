


## levels 

SET TRANSACTION ISOLATION LEVEL READ COMMITTED; // default 
only see committed rows, allows diff. query results during tx 

SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
snapshot isolation: only see data committed before tx began. impl. by MVCC

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
impl. by MVCC+SSI 
SSI: predicate locks + deps graph cycle detection. 20% perf cost 
predicate is a condition like "age > 18"

## MVCC 
each tx gets a snapshot xmin, xmax, xid_list

xmin: xid that created the row 
xmax: xid that updated/deleted the row 
xid_list: list of active tx ids

eg. 12340:12350:12342,12345,12347

32 bit tx id


