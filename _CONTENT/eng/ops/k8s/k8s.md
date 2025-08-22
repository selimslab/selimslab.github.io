---
---
Control Plane
  kube-apiserver
  etcd
  kube-scheduler
  kube-controller-manager
  cloud-controller-manager?

Node
  kubelet
  kube-proxy
  container runtime
  coredns
  taints/labels/annotations

# apiversion index
v1
  Namespace

  ServiceAccount

  ConfigMap
  Secret

  Pod

  Service
  Endpoints

  Volume
  PV
  PVC

apps/v1
  Deployment
  ReplicaSet

  StatefulSet

  DaemonSet

batch/v1
  Job
  CronJob

autoscaling
  VPA
  HPA

policy
  PDB

*.k8.io
  storage
    StorageClass

  networking
    IngressClass
    Ingress
    NetworkPolicy

  rbac
    Role

    RoleBinding
      Role
      ServiceAccount

    ClusterRole
    ClusterRoleBinding

  scheduling
    PriorityClass

  metrics
    NodeMetrics
    PodMetrics

  apiextensions
    CRD

## v1

Namespace
  ResourceQuota
  LimitRange
  Event

ServiceAccount
  tokens mounted at /var/run/secrets/kubernetes.io/serviceaccount/token

ConfigMap

Secret

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
    probes

Service
  type: ClusterIP | NodePort | LoadBalancer
  ports

Endpoints

Volume
  emptyDir | hostPath | ConfigMap | Secret | PersistentVolumeClaim

PersistentVolume
  storageClassName
  accessModes
  reclaimPolicy

PersistentVolumeClaim
  storageClassName
  accessModes
  storage requests

## apps/v1

Deployment
  replicas
  template: Pod
  strategy

ReplicaSet
  replicas
  template: Pod

StatefulSet
  replicas
  template: Pod
  volumeClaimTemplates
  serviceName

DaemonSet
  template: Pod

## batch/v1

Job
  template: Pod
  completions/parallelism

CronJob
  jobTemplate: Job

## autoscaling

VerticalPodAutoscaler (VPA)

HorizontalPodAutoscaler (HPA)
  target: Deployment | StatefulSet
  metrics

## policy
PodDisruptionBudget (PDB)
  selector
  minAvailable | maxUnavailable

## storage.k8s.io
StorageClass
  provisioner
  reclaimPolicy
  volumeBindingMode

## networking.k8s.io
IngressClass
  controller

Ingress
  ingressClassName
  rules

NetworkPolicy
  policyTypes: Ingress | Egress
  from/to + ports

## rbac.authorization.k8s.io
Role
RoleBinding
  Role
  ServiceAccount
ClusterRole
ClusterRoleBinding
  ClusterRole
  ServiceAccount

## scheduling.k8s.io
PriorityClass

## apiextensions.k8s.io
CustomResourceDefinition (CRD)

## metrics.k8s.io
NodeMetrics
PodMetrics

## pod-security.kubernetes.io
PodSecurityStandards

## admissionregistration.k8s.io
ValidatingAdmissionWebhook
MutatingAdmissionWebhook
