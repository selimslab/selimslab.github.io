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

## websec
```
parse
auth
rate limit: L4 firewall, L7 app 
  
cookies
  restrict to domain
  https 
  block js
  expire

certs
  CA signs that the site owns the private key for their public key 

CORS: cross-origin resource sharing, set allowed origins 

CSRF token, request forgery

XSS
  Content Security Policy: allow-list scripts and assets
  validate and encode inputs 
```
