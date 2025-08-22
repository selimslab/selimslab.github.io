---
---
```
kubelet 
kube-proxy 

kubectl
  get pods | services | deployments | nodes | namespaces | events
  describe 
  logs
  explain 
  label 
  exec


kubeadm: cluster bootstrap
  init 
  reset

  certs check-expiration | renew all

  config print init-defaults | join-defaults
  config images list | pull

  upgrade 

kustomize: config management
  build <dir> [--enable-helm]
```
