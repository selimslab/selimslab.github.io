---
---
## TLS

Transport layer security

process 1 -- encrypted socket -- process 2

1. handshake 
2. key exchange: first asym. then sym. shared key 
3. auth: server sends cert, client verifies 
4. encrypt all data using shared sym. key and AES, etc. 
5. verify integrity with crpt. hashes. tls 1.2 used HMAC. Add a signature/seal to each msg. sign = MAC(secret_key, msg)

## Cert. 

browser and OS have some root CAs pre-config. 

CA certifies that a website owns the private key for their public key 

CAs form a tree 

## Cookies 

A piece of data stored on browser. 

Usecases: sessions, tracking

You can restrict them to a domain, expire, require https, block js access, etc. 

## CORS

Cross-origin Resource Sharing 

Control allowed origins `protocol:host:port`

By default, XMLHttpRequest or fetch APIs allows same-origin only 

You can verify resource `integrity` or disallow iframes 

Access-Control-Allow-(origin-methods-headers)

## CSRF

Cross-site request forgery  

Forging of a valid request. Having an unpredictable request parameter prevents this. 

We call this param a CSRF token. It's a large random value. It's unique per user and session. Forms have CSRF tokens. 

## XSS

Cross-site scripting is injecting malicious code into a website so user's browser executes it 

Validate and encode inputs to prevent xss. Disable inline js so all js must be loaded from script tags. Allow-list scripts and assets in `Content Security Policy` header

For example `<script>` would be encoded as `&lt;script&gt;`
