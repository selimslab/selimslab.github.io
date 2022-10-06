---
tags: sec

---

A key is a piece of information, usually a string of numbers or letters

If you use a single key, its symmetric cryptography

Public-key, or asymmetric cryptography, is a system that uses pairs of keys based on mathematical one-way functions 

---

There are two keys, one public, one private, they are a pair 

Only the private key can decrypt a message which is encrypted with its public key 

And public key can verify if a message is signed with its private key 

eg.

1. Alice and Bob shares their public keys in the open, 

Bob 
1. writes a message to Alice
2. signs it with his private key
3. encrypts it using Alice's public key and 

Alice 
1. Gets the encrypted message
2. Opens it using her private key 
3. Verifies the signature using Bob's public key 


<https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange>
