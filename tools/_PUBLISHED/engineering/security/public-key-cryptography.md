---
---

A key is a piece of information, a string of numbers or letters

If you use a single key, its symmetric cryptography. If there's a pair of keys, it asymmetric

Public key cryptography uses two keys, one public, one private, they are a pair 

Only the private key can decrypt a message which is encrypted with its public key 

And public key can verify if a message is signed with its private key 

eg.

1. Alice and Bob shares their public keys in the open

Bob 
1. writes a message to Alice
2. signs it with his private key
3. encrypts it using Alice's public key 

Alice 
1. Gets the encrypted message
2. Opens it using her private key 
3. Verifies the signature using Bob's public key 


[Diffie–Hellman key exchange - Wikipedia](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange)

[A Stick Figure Guide to the Advanced Encryption Standard (AES)](http://www.moserware.com/2009/09/stick-figure-guide-to-advanced.html)