---
---
## hashing  

input of any size -> fixed size output 

same input, same output

one-way 

coll. resist. 

avalanche 

non-crypt vs crypt

eg. 
- md5: 128-bit, weak
- sha-256: Secure Hash Algorithm
- bcrypt: password hashing
- blake2


HMAC (hash-message based auth code)
- verifies message integrity 
- hash func (like SHA-256) + secret key  HMAC(message, secret)

hash(password + salt)


## key exchange 

diffie-hellman 
1. agree on a large prime p, and a generator g 
2. pri = g(p) 
3. pub = g(pri, p)
4. exchange pubs 
5. each arrives at the same secret 

## encryption 

AES (advanced encryption standard)
- sym 
- fast, hardware optimized
- good for bulk encryp. 

RSA (public-key) 
- asym 
- public private, key pairs 
- based on factoring large primes, it's easy to verify factors, but hard to generate
- slower but more secure for dist. sys. 


RSA established conn. exchanges AES key, AES handles the rest 


## Public key cryptography 

asymmetric (uses a pair of keys, one public, one private)

1. Alice and Bob shares their public keys in the open
2. Bob signs his message with his private key, encrypts using Alice's public key 
3. Only Alice can decrypt the message, then verifies Bob's signature with his public key 


## Some ideas
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





## TLS: Transport layer security

process 1 -- encrypted socket -- process 2

1. handshake 
2. key exchange: first asym. then sym. shared key 
3. auth: server sends cert, client verifies 
4. encrypt all data using shared sym. key and AES, etc. 
5. verify integrity with crpt. hashes. tls 1.2 used HMAC. Add a signature/seal to each msg. sign = MAC(secret_key, msg)

## SSH (secure shell)

1. client connects to ssh server on port 22
2. negotiate enc. algos and exchange keys
3. auth via passwd, public key, etc. 
4. enc. all data 