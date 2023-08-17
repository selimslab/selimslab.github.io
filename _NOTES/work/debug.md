---
---

### How to debug locally?

It's possible to attach a debugger to a K8 pod

[K8 debugging guide](https://dev.azure.com/dynamicscrm/CXPlatform/_wiki/wikis/CXP%20team%20wiki/6685/k8s-debugging?anchor=vs-code)

The l2TestSetup script has sk-deploy or sk-startdev, it will start a local minikube cluster and you can see the pods from the K8 extension

The steps here will enable you to attach a debugger to running pods

ctrl + shift + P -> Run tasks -> Publish

Install Kubernetes extension by Microsoft

ctrl + shift + P -> change kubernetes namespace -> cxp

Then you can start a debug session with F5 or Run menu

Add a breakpoint

Send a request to the local cluster at public-localhost.. or start an L2 test

Check "run and debug" menu of vscode