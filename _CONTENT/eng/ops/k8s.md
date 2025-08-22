---
---
```
control plane
  kube-apiserver
  etcd
  kube-scheduler

  kube-controller-manager
  cloud-controller-manager?

node
  kubelet
  containerd runc 

  kube-proxy
  coredns
```


```md
# apiversion index 

## v1
Pod
  containers
  volumes
  restartPolicy

  affinity
  tolerations

  container
    image
    volumeMounts
    env
    resources

Namespace
  ResourceQuota
  LimitRange

ServiceAccount
  tokens mounted at /var/run/secrets/kubernetes.io/serviceaccount/token


ConfigMap
Secret

Volume
  emptyDir | hostPath | ConfigMap | Secret | PersistentVolumeClaim

Service   
  type: ClusterIP | NodePort | LoadBalancer

EndpointSlices

PersistentVolume
  storageClassName
  accessModes

PersistentVolumeClaim
  storage requests

## apps/v1
Deployment
ReplicaSet

StatefulSet

DaemonSet

## batch/v1
Job
CronJob

## autoscaling
VerticalPodAutoscaler (VPA)

HorizontalPodAutoscaler (HPA)
  target: Deployment | StatefulSet
  metrics

## policy
PodDisruptionBudget (PDB)
  selector
  minAvailable | maxUnavailable

## storage.k8.io
StorageClass
  provisioner
  volumeBindingMode

## networking.k8.io
IngressClass
  controller

Ingress
  ingressClassName
  rules

NetworkPolicy
  policyTypes: Ingress | Egress
  from/to + ports

## rbac.k8.io
Role

RoleBinding
  Role
  ServiceAccount

ClusterRole
ClusterRoleBinding

## scheduling.k8.io
PriorityClass

## metrics.k8.io
NodeMetrics
PodMetrics

## apiextensions.k8.io
CustomResourceDefinition (CRD)

## admissionregistration.k8s.io
*AdmissionWebhook
```

