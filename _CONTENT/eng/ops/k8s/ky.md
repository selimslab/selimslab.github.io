---
---
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: nsx


apiVersion: v1
kind: ResourceQuota
metadata:
  namespace: nsx
  name: compute-quota
spec:
  hard:
    requests.cpu: "1"
    requests.memory: 1Gi
    limits.cpu: "2"
    limits.memory: 2Gi


apiVersion: v1
kind: LimitRange
metadata:
  namespace: nsx
  name: mem-limit-range
spec:
  limits:
  - default:
      memory: "512Mi"
    defaultRequest:
      memory: "256Mi"
    type: Container


apiVersion: v1
kind: ConfigMap
metadata:
  namespace: nsx
  name: app-config
data:
  database.properties: |
    host=db.example.com
    port=5432
  app.properties: |
    debug=true


apiVersion: v1
kind: Secret
metadata:
  namespace: nsx
  name: app-secret
type: Opaque
data:
  username: YWRtaW4=
  password: MWYyZDFlMmU2N2Rm


apiVersion: v1
kind: ServiceAccount
metadata:
  namespace: nsx
  name: app-service-account
automountServiceAccountToken: true


apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-example
spec:
  storageClassName: fast-ssd
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  hostPath:
    path: /data


apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  namespace: nsx
  name: pvc-example
spec:
  storageClassName: fast-ssd
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi


apiVersion: v1
kind: Pod
metadata:
  namespace: nsx
  name: app-pod
spec:
  containers:
  - name: app-container
    image: nginx:1.20
    volumeMounts:
    - name: config-volume
      mountPath: /etc/config
    - name: data-volume
      mountPath: /data
    env:
    - name: ENV_VAR
      value: "production"
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
    livenessProbe:
      httpGet:
        path: /health
        port: 8080
  volumes:
  - name: config-volume
    configMap:
      name: app-config
  - name: data-volume
    persistentVolumeClaim:
      claimName: pvc-example
  restartPolicy: Always


apiVersion: v1
kind: Service
metadata:
  namespace: nsx
  name: app-service
spec:
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 8080
    protocol: TCP
  selector:
    app: myapp


apiVersion: v1
kind: Endpoints
metadata:
  namespace: nsx
  name: external-service
subsets:
- addresses:
  - ip: 192.168.1.100
  - ip: 192.168.1.101
  ports:
  - port: 8080
    protocol: TCP






apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: nsx
  name: app-deployment
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
      - name: app-container
        image: nginx:1.20
        ports:
        - containerPort: 80

apiVersion: apps/v1
kind: StatefulSet
metadata:
  namespace: nsx
  name: web-statefulset
spec:
  replicas: 3
  serviceName: "nginx"
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.20
        ports:
        - containerPort: 80
        volumeMounts:
        - name: www
          mountPath: /usr/share/nginx/html
  volumeClaimTemplates:
  - metadata:
      name: www
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: "fast-ssd"
      resources:
        requests:
          storage: 1Gi


apiVersion: apps/v1
kind: DaemonSet
metadata:
  namespace: nsx
  name: fluentd-daemonset
spec:
  selector:
    matchLabels:
      name: fluentd
  template:
    metadata:
      labels:
        name: fluentd
    spec:
      containers:
      - name: fluentd
        image: fluentd:latest
        volumeMounts:
        - name: varlog
          mountPath: /var/log
      volumes:
      - name: varlog
        hostPath:
          path: /var/log






apiVersion: batch/v1
kind: Job
metadata:
  namespace: nsx
  name: pi-calculation
spec:
  completions: 1
  parallelism: 1
  template:
    spec:
      containers:
      - name: pi
        image: perl
        command: ["perl", "-Mbignum=bpi", "-wle", "print bpi(2000)"]
      restartPolicy: Never
  backoffLimit: 4


apiVersion: batch/v1
kind: CronJob
metadata:
  namespace: nsx
  name: hello-cronjob
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: hello
            image: busybox
            command:
            - /bin/sh
            - -c
            - date; echo Hello from the Kubernetes cluster
          restartPolicy: OnFailure






apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: nsx
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]


apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: nsx
subjects:
- kind: ServiceAccount
  name: app-service-account
  namespace: nsx
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io






apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp2
reclaimPolicy: Retain
volumeBindingMode: WaitForFirstConsumer






apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  name: nginx-ingress
spec:
  controller: nginx.org/ingress-controller


apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  namespace: nsx
  name: app-ingress
spec:
  ingressClassName: nginx-ingress
  rules:
  - host: app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: app-service
            port:
              number: 80


apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  namespace: nsx
  name: deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress


apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  namespace: nsx
  name: allow-specific
spec:
  podSelector:
    matchLabels:
      app: myapp
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080






apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  namespace: nsx
  name: app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: app-deployment
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80






apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  namespace: nsx
  name: app-pdb
spec:
  selector:
    matchLabels:
      app: myapp
  minAvailable: 2






apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000
globalDefault: false
description: "High priority class for critical workloads"






apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: databases.example.com
spec:
  group: example.com
  versions:
  - name: v1
    served: true
    storage: true
    schema:
      openAPIV3Schema:
        type: object
        properties:
          spec:
            type: object
            properties:
              size:
                type: string
              version:
                type: string
  scope: Namespaced
  names:
    plural: databases
    singular: database
    kind: Database
```
