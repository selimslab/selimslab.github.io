---
---
## hash
```
hash = func(input)

fixed size
one-way

collision resistant
avalanche

password hash = bcrypt(password + salt)
checksum = sha256(message, secret)
```

# encrypt
```
cyphertext = encrypt(input, key)

sym: single private shared secret
asym: public-private

RSA: public, prime-factoring
AES: advanced encryption standard, single secret, fast, hardware optimized

diffie-hellman key exchange
```

## heuristics

zero-trust: always verify

threat model
depth and breadth

layer
isolate
zones: public, private, secret

auth
    levels
    least privilege
    allow-lists
    multi-factor

log audit events
exponential delays

rotate secrets
scan repos for secrets