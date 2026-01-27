---
---
```
simulate
progressive rollouts
blue/green, canary 
test in prod
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