---
---
## TLS: Transport layer security

process 1 -- encrypted socket -- process 2

1. handshake 
2. key exchange: first asym. then sym. shared key 
3. auth: server sends cert, client verifies 
4. encrypt all data using shared sym. key and AES, etc. 
5. verify integrity with crpt. hashes. TLS 1.2 used HMAC. Add a signature/seal to each msg. sign = MAC(secret_key, msg)

## SSH (secure shell)

1. client connects to ssh server on port 22
2. negotiate encr. algos and exchange keys
3. auth via passwd, public key, etc. 
4. encr. all data 