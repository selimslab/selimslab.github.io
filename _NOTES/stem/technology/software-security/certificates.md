---
tags: sec

---


How do we know a public key really belongs to Alice? 

Anyone could come and claim they are Alice,

We need a mechanism to ensure that the public key really belongs to Alice  

---

In reality, you trust some entity, and it trusts others

For example, imagine you visit a website claiming to be your bank, how can you trust it?

Your browser or operating system comes with pre-configured certificate authorities (CA), they are your root certificates

1. a website shares its public key with a CA 
2. CA verifies they are the bank indeed, and signs their public key 
3. the website hands you the certificate 

Yet how do you trust this is signed by the CA indeed? 

Someone else signed the CAs public key, too

You keep checking the certificates until you reach a trusted root certificate at the bottom 

so its turtles all the way down 
