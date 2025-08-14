---
---
Control Plane
- API Server - Central communication hub
- etcd - Cluster state storage
- Scheduler - Pod placement decisions
- Controller Manager - Maintains desired state

Workloads
- Pod - Smallest deployable unit
- Deployment - Manages pod replicas and updates
- ReplicaSet - Ensures pod count
- StatefulSet - Ordered, persistent pods
- DaemonSet - One pod per node

Networking
- Service - Stable network endpoint
- Ingress - External HTTP/HTTPS routing
- DNS/CoreDNS - Service discovery
- CNI Plugin - Container networking
- kube-proxy - Service routing rules
- Network Policy - Pod communication rules

Storage
- Volume - Container storage
- Persistent Volume - Cluster storage resource
- Persistent Volume Claim - Storage request
- CSI Driver - Storage backend interface
- StorageClass - Dynamic provisioning

Configuration & Secrets
- ConfigMap - Non-sensitive configuration
- Secret - Sensitive data (encrypted)
- Environment Variables - Runtime config

Security & Access
- RBAC - Role-based access control
- Service Account - Pod identity
- Pod Security Standards - Security policies
- Network Policy - Traffic isolation

Node Components
- kubelet - Node agent managing pods
- Container Runtime - Runs containers
- kube-proxy - Network proxy

Resource Management
- Namespace - Logical partitioning
- Resource Quotas - Namespace limits
- Limit Ranges - Pod/container limits
- QoS Classes - Priority levels

Monitoring & Operations
- Metrics Server - Resource usage
- Events - Cluster activity log
- Health Checks - Liveness/readiness probes
