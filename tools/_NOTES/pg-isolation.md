
## MVCC
xmin: xid that created the row 
xmax: xid that updated/deleted the row 

each tx gets a snapshot ss = [list of active tx ids]

## levels 

read committed

repeatable read, rr: only see data committed before tx began

serializable: rr + SSI. locks + deps graph analysis. 20% perf cost yh