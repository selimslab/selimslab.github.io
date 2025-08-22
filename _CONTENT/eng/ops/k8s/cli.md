---
---
## daemons
  kubelet - node agent
    --config <file>
    --kubeconfig <file>
    --container-runtime-endpoint
    --max-pods
    --node-labels

  kube-proxy - network proxy
    --config <file>
    --proxy-mode iptables | ipvs | userspace
    --cluster-cidr <cidr>



## clients
kubectl
  get pods | services | deployments | nodes | namespaces | events
  describe <resource> <name>
  logs <pod> [-f] [-c <container>]
  explain <resource>

  create -f <file>
  apply -f <file>
  delete <resource> <name>
  edit <resource> <name>
  patch <resource> <name>

  scale deployment <name> --replicas=<n>
  rollout status | history | undo deployment <name>

  exec -it <pod> -- /bin/bash
  port-forward <pod> <local-port>:<pod-port>
  cp <pod>:<path> <local-path>

  cluster-info
  top nodes | pods
  api-resources | api-versions

  config get-contexts | use-context | current-context
  config set-context <context>

  label <resource> <name> <key>=<value>
  annotate <resource> <name> <key>=<value>
  drain | cordon | uncordon <node>

kubeadm - cluster bootstrap
  init [--config <file>]
  join <endpoint> --token <token>
  reset
  certs check-expiration | renew all
  config print init-defaults | join-defaults
  config images list | pull
  upgrade plan | apply <version> | node

kustomize - config management
  build <dir> [--enable-helm]
  edit add resource <file>
  edit set image <name>=<image>
  edit set namespace <namespace>

