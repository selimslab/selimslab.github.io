---
---
⏺ Complete Kubernetes Guide: From Code to Production

  Part 1: Running Code in Kubernetes - Step by Step

  1. Containerize Your Application

  Create a Dockerfile and build your container image:
  FROM node:18-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci --only=production
  COPY . .
  EXPOSE 3000
  CMD ["npm", "start"]

  Build and push to registry:
  docker build -t myapp:v1.0 .
  docker push myregistry.com/myapp:v1.0

  2. Create Kubernetes Manifests

  Deployment:
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: myapp-deployment
  spec:
    replicas: 3
    selector:
      matchLabels:
        app: myapp
    template:
      metadata:
        labels:
          app: myapp
      spec:
        containers:
        - name: myapp
          image: myregistry.com/myapp:v1.0
          ports:
          - containerPort: 3000

  Service:
  apiVersion: v1
  kind: Service
  metadata:
    name: myapp-service
  spec:
    selector:
      app: myapp
    ports:
    - port: 80
      targetPort: 3000
    type: LoadBalancer

  3. Deploy and Monitor

  kubectl apply -f deployment.yaml
  kubectl apply -f service.yaml
  kubectl get pods,services
  kubectl logs -f deployment/myapp-deployment

  Part 2: Essential Concepts

  Core Building Blocks

  - Pod - Smallest deployable unit (1+ containers)
  - Deployment - Manages pod replicas and updates
  - Service - Stable network endpoint for pods
  - ConfigMap/Secret - Configuration and sensitive data

  Resource Management

  - Namespace - Logical cluster partitioning
  - Node - Worker machine running pods
  - Volume - Persistent storage for containers

  Networking & Discovery

  - Ingress - External HTTP/HTTPS routing
  - DNS - Service discovery within cluster
  - Network Policy - Pod-to-pod communication rules

  Orchestration Primitives

  - Scheduler - Pod placement decisions
  - Controller - Maintains desired state
  - etcd - Cluster state storage
  - kubelet - Node agent managing pods

  Part 3: Working Mechanisms Under the Hood

  Container Isolation

  - Linux namespaces - Process, network, filesystem isolation
  - cgroups - Resource limits and accounting
  - Container runtime - Creates and manages containers

  Networking Flow

  When a pod starts:
  1. CNI plugin creates virtual ethernet pair
  2. kube-proxy sets up iptables rules for services
  3. CoreDNS provides service name resolution
  4. Traffic flows: Container → Pod network → Node bridge → Cluster
  network

  Scheduling & Placement

  1. API Server receives pod creation request
  2. Scheduler filters unsuitable nodes
  3. Scoring algorithm ranks remaining nodes
  4. Binding assigns pod to best node
  5. Kubelet starts containers on selected node

  State Management

  - API server - Central communication hub with authentication
  - etcd consensus - Distributed state storage across control plane
  - Controller loops - Continuously reconcile desired vs actual state

  Storage & Security

  Volume Management:
  - CSI drivers interface with storage backends
  - Persistent volumes represent actual storage resources
  - Volume mounting makes storage available in containers

  Secrets Management:
  - Encrypted at rest in etcd
  - tmpfs mounting keeps secrets in memory only
  - Namespace isolation restricts access

  Part 4: Essential Tools

  Must-Have Core Tools

  - kubectl - Official CLI for all cluster operations
  - k9s - Interactive terminal dashboard
  - Helm - Package manager for applications

  Development & Operations

  - Lens - Visual cluster management desktop app
  - Stern - Multi-pod log streaming
  - Prometheus + Grafana - Metrics and visualization
  - ArgoCD - GitOps deployment automation

  Security & Policy

  - Trivy - Vulnerability scanning
  - OPA Gatekeeper - Policy enforcement
  - kubectx/kubens - Context/namespace switching

  Part 5: Key Integration Points

  Runtime Architecture

  User → kubectl → API Server → etcd (state storage)
                       ↓
                Scheduler → Node Selection
                       ↓
                kubelet → Container Runtime → Linux Kernel
                       ↓                      ↓
                CNI Plugin → Networking    cgroups → Resource Limits
                       ↓
                CSI Driver → Storage Volumes

  Essential Patterns

  - Declarative configuration - Describe desired state, not steps
  - Label selectors - Resource grouping and targeting
  - Health checks - Liveness and readiness probes
  - Resource limits - CPU/memory constraints
  - Controller pattern - Continuous reconciliation loops

  Quality of Service Classes

  - Guaranteed - requests = limits (highest priority)
  - Burstable - requests < limits (medium priority)
  - BestEffort - no limits set (lowest priority)

  Part 6: Production Considerations

  Monitoring & Troubleshooting

  # Pod debugging
  kubectl describe pod <name>
  kubectl logs -f <pod-name>
  kubectl exec -it <pod-name> -- /bin/sh

  # Resource monitoring
  kubectl top nodes
  kubectl top pods
  kubectl get events --sort-by=.metadata.creationTimestamp

  Common Issues & Solutions

  - ImagePullBackOff - Check registry access and image name
  - CrashLoopBackOff - Review application logs and resource limits
  - Pending pods - Verify node resources and scheduling constraints
  - Service connectivity - Validate label selectors and endpoints

  This comprehensive guide covers the complete journey from
  containerizing code to understanding Kubernetes internals, providing
  both practical steps and conceptual depth for effective cluster
  operations.
