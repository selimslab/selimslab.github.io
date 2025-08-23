---
---
## core 
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

kubectl
  get pods | services | deployments | nodes | namespaces | events
  describe 
  logs
  explain 
  label 
  exec
```

### key names 
```
Namespace

Deployment 
  ReplicaSet
    Pods 
      containers 
  StatefulSet
  DaemonSet

ResourceQuota
LimitRange

Service
Endpoints
NetworkPolicy
Ingress

Volume 
PV
PVC
StorageClass

ServiceAccount
RoleBinding

ConfigMap
Secret

VPA
HPA

Job
Cron

priority 

webhook 

metrics

custom crd

```

## tools 
```
kubeadm: cluster bootstrap
kustomize: config management
k9s: cli

Terraform
Ansible
Helm
Kustomize

ArgoCD

NGINX Ingress Controller 
Traefik

OPA Gatekeeper
cert-manager
Vault

Prometheus 
Loki
Grafana
Jaeger

Istio 
Linkerd
```


## apiversion
```
v1
  Namespace
    ResourceQuota
    LimitRange

  ServiceAccount
    tokens mounted at /var/run/secrets/kubernetes.io/serviceaccount/token

  Pod
    container
      image

    volumes
    restartPolicy

  ConfigMap
  Secret

  Service   
    type: ClusterIP | NodePort | LoadBalancer

  EndpointSlices

  Volume
    emptyDir | hostPath | ConfigMap | Secret | PersistentVolumeClaim

  PersistentVolume
    storageClassName
    accessModes

  PersistentVolumeClaim
    storage requests

apps/v1
  Deployment
  ReplicaSet

  StatefulSet

  DaemonSet

batch/v1
  Job
  CronJob

autoscaling
  VerticalPodAutoscaler (VPA)

  HorizontalPodAutoscaler (HPA)
    target: Deployment | StatefulSet
    metrics

policy
  PodDisruptionBudget (PDB)
    selector
    minAvailable | maxUnavailable

storage.k8.io
  StorageClass
    provisioner
    volumeBindingMode

networking.k8.io
  IngressClass
    controller

  Ingress
    ingressClassName
    rules

  NetworkPolicy
    policyTypes: Ingress | Egress
    from/to + ports

rbac.k8.io
  Role

  RoleBinding
    Role
    ServiceAccount

  ClusterRole
  ClusterRoleBinding

scheduling.k8.io
  PriorityClass

metrics.k8.io
  NodeMetrics
  PodMetrics

apiextensions.k8.io
  CustomResourceDefinition (CRD)

admissionregistration.k8s.io
  *AdmissionWebhook
```
