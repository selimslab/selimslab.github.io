---
title: Communicating Sequential Processes
---

Go and Clojure use this model. Sequential processes can be OS processes but also threads or green-threads managed at the user-space 

Go routines communicating with channels 

It works well but it's limited to a single runtime, even the two go processes on the same machine cannot coordinate with this, let alone distributed machines 

[[actor-model]]