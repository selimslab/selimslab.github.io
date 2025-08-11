---
---
- zero-trust (always verify)
- validate, sanitaze, isolate

- threat model
- depth and breadth, layered

- allow-lists
- two-factor
- auth levels
- least privilege

- exp. delays

zones: public, private, secret
scan repos for secrets
rotate secrets


## encrp.
input + key -> func -> cyphertext

sym. or asym.

Public key: asym, public encrypts, private decrypts
Private key: single shared secret

RSA: public. based on factoring large primes: easy to verify factors, but hard to generate
AES (advanced encryption standard): sym, fast, hardware optimized

start with RSA, exchange AES key

## key exchange
diffie-hellman

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
