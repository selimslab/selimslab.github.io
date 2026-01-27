---
---
## postgres 
```
select for update
update skip locked

indexes: b-tree, gin, gist, brin
```

## nosql
```
kv: redis, etcd
doc: mongo, dynamo

blob: s3

wide-family: cassandra, bigtable, hbase 

columnar: bigquery, clickhouse
time-series: influx, timescale
        
graph: neo4j, cypher, variable paths * 

search: lucene, solr, elastic
    
multi modal: dynamo, cosmos
```

## redis 
```
sorted set: skip list + map
    zadd zrem zrank

tags
    user:{123}:profile
    {123} is a tag
    tags go to the same shard

redlock
  multi-master cluster
  majority lock with ttl

scaling 
    Single 
    HA: read replicas
    Sentinel: auto failover
    Cluster: horizontal

sharding
    redis shards by hash slots, clients route
    CRC16(key) % 16384
```


## k8s 
```
control plane 
  api-server
  etcd 
  scheduler 
  controller-manager 

node
  kubelet 
  kube-proxy
  coredns 
  
namespace 
  deployment
  pvc
  service 
  secret 
  hpa 

  job
  cron 

deployment 
  daemonset
  statefulset 
  replicaset 
    pod 
      container 

resource quota

volume: emptyDir | hostPath | ConfigMap | Secret | PersistentVolumeClaim

service: ClusterIP | NodePort | LoadBalancer
endpoint 
ingress 
network policy 

service account 
rbac role 
configmap 
secret 

metrics
hpa/vpa pod auto scaler

CustomResourceDefinition
webhooks

kubectl: get, describe, explain
```

## nginx 
```
load-balance
rate-limit 

filter 
log 

gzip
buffer

tls-terminate 
manage certs

health-check
failover
```