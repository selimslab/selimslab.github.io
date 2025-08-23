---
---
input -> hash func -> fixed size output

same input, same output
one-way

coll. resist.
avalanche

non-crypt vs crypt

eg.
md5: 128-bit, weak
sha-256: Secure Hash Algorithm
bcrypt: password hashing
blake2

HMAC (hash-message based auth code)
verifies message integrity
hash func (like SHA-256) + secret key  HMAC(message, secret)

hash(password + salt)