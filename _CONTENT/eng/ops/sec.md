---
---
## hash

input -> hash func -> fixed size output

same input, same output
one-way
collision resistant
avalanche

eg.
md5
bcrypt
sha-256

passwords
bcrypt(password + salt)

sha
Secure Hash Algorithm

verify message integrity
HMAC
hash-message based auth code
sha256(message, secret)

# encrypt

input + key -> func -> cyphertext

sym
single private shared secret

asym
public encrypts
private decrypts

RSA
asym.
based on factoring large primes
hard to generate factors, easy to verify

AES
advanced encryption standard
sym
fast, hardware optimized

key exchange
diffie-hellman


## heuristics

zero-trust: always verify

isolate
layer

threat model
depth and breadth

zones: public, private, secret

auth levels
least privilege
allow-lists
multi-factor

log audit events

exponential delays

scan repos for secrets
rotate secrets
