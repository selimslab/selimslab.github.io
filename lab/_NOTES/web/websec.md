

## Certificates 

How do we know a public key really belongs to Alice? Anyone can claim they are Alice

For example, imagine you visit a website claiming to be your bank, how can you trust it?

In current world, you trust some entity, and it trusts others. 

Your browser or operating system comes with pre-configured certificate authorities (CA), they are your root certificates
1. a website shares its public key with a CA 
2. CA verifies they are the bank indeed, and signs their public key 
3. the website hands you the certificate 

Yet how do you trust this is signed by the CA indeed? Someone else signed the CAs public key, too. You keep checking the certificates until you reach a trusted root certificate at the bottom 

Its turtles all the way down 


## Cookies 

A piece of data stored on browser. 

Usecases: sessions, tracking

You can restrict them to a domain, expire, require https, block js access, etc. 

## CORS

Cross-origin Resource Sharing 

Control allowed origins `protocol:host:port`

By default, XMLHttpRequest or fetch APIs allows same-origin only 

You can verify resource `integrity` or disallow iframes 

## CSRF

Cross-site request forgery  

Forging of a valid request. Having an unpredictable request parameter prevents this. 

We call this param a CSRF token. It's a large random value. It's unique per user and session. Forms have CSRF tokens. 

## XSS

Cross-site scripting is injecting malicious code into a website so user's browser executes it 

Validate and encode inputs to prevent xss. Disable inline js so all js must be loaded from script tags. Allow-list scripts and assets in `Content Security Policy` header

For example `<script>` would be encoded as `&lt;script&gt;`
