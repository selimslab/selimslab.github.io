

hash(password + salt)


---


Some good practices:
- determine weak points, threat model
- defense in depth and breadth
- simple sys has less attack surface
- allow-lists
- two-factor authentication
- exponential delays on failed attempts
- zero-trust (always verify)
- least privilege
- authentication levels
- validate, sanitaze, isolate


---

Public key cryptography is asymmetric (uses a pair of keys, one public, one private)

1. Alice and Bob shares their public keys in the open
2. Bob signs his message with his private key, encrypts using Alice's public key 
3. Only Alice can decrypt the message, then verifies Bob's signature with his public key 

---

TLS: Transport layer security

process 1 -- encrypted socket -- process 2

