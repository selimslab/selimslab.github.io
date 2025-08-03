---
---
## encrp. 

input + key -> func -> cyphertext

sym. or asym. 

Public key cryp:  asym, public encrypts, private decrypts

Private key cryp. single shared secret to both encr/decr, needs key exchage 

AES (advanced encryption standard): sym. fast, hardware optimized

RSA: public-key, based on factoring large primes, it's easy to verify factors, but hard to generate

conn. with RSA, exchange AES key, cont. w. aes


## key exchange 

diffie-hellman 
1. agree on a large prime p, and a generator g 
2. pri = g(p) 
3. pub = g(pri, p)
4. exchange pubs 
5. each arrives at the same secret 


## hashing  

input -> hash func -> fixed size output 

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


## encryption 

RSA encryption is based on the difficulty of factoring large numbers that are products of two
large prime numbers. The security relies on the computational difficulty of finding the prime
factors of very large composite numbers (typically 1024-4096 bits), which becomes exponentially
harder as the number size increases.

Elliptic Curve Cryptography (ECC): Based on the discrete logarithm problem over elliptic curves -
finding the scalar multiple of a point on an elliptic curve.

Diffie-Hellman: Based on the discrete logarithm problem in finite fields - finding the exponent
when given a base and result in modular arithmetic.

AES (symmetric encryption): Based on substitution-permutation networks with confusion and diffusion
principles, not number theory problems.

Post-quantum cryptography: Uses problems like lattice-based cryptography (shortest vector problem),
hash-based signatures, or multivariate polynomial equations that are believed to resist quantum
attacks.