---
layout: post
title: Software Security 
tags: software best 
--- 
# fundamentals

## Plan for security from the start

* model possible threats
* ask what can go wrong? 
* no system is 100% secure, security is an example of "unknown unknowns"

## attack surface
* Attack vectors include user input fields, protocols, interfaces, and services.
* Keep the attack surface minimum. 
* Keep it simple. 

## Fail securely
* consider all 3 cases, allow, disallow, exception

## test 
* write exploit code to test your patches 

## passwords

* use strong passwords
* never keep plain-text passwords

## validate and sanitize 

* never trust any input, always validate, always sanitize

## do not roll your own 

* don't try to roll your own security solutions, it's a community effort 
* don't write your own crypto
* do not encrypt passwords, hash them with a salt 

## auth 
* use authorization levels
* use whitelists, not blacklists 
* Least privilege, never grant more access than required
* Separation of Privileges, so your system is not all or nothing
  
## be up to date 
* use well-known tried and tested libraries only
* keep your libraries up to date 

## log 

* log suspicious activity
* Examples are failed login attempts, 
invalid input, statistically rare or unexpected events 

## secrets

* Hiding secrets is hard - and secrets hidden in code won't stay secret for long
* Be careful to not check in secrets to public repos
* be aware of buffer overflow attacks 
* avoid security through obscurity 


# web specific  

## HTTPS

* use HTTPS 
* don't allow HTTP access to secure pages
  
## SQL

* parametrize SQL queries to prevent SQL injection
* do not trust user input, validate, sanitize

## auth 

* use 2-factor auth 
* enforce strong passwords
* add exponential delay to repeated login attempts
* lock account after repeated failed login attempts 

## Cross-site request forgery CSRF 

3 key conditions for a CSRF attack are
   
1. A relevant action

2. Only mechanism to track session is a cookie

3. All request parameters predictable 


* CSRF tokens are large random values, unique per user & per user session, so they disable condition 3 
* use CSRF tokens with forms
* CSRF tokens should not be transmitted within cookies, use `SameSite` header to forbid sending the cookie via cross-origin requests 

[more on CSRF](https://portswigger.net/web-security/csrf)

## Cookies
* prepend cookies with __Secure to prevent them from being overwritten 
* set cookies with `Secure` flag so they can only be sent over HTTPS 
* set HTTPOnly for cookies that don’t require access from JavaScript

* All cookies must be set with the Secure flag, and set as restrictively as possible

* Cookie names may be either be prepended with either __Secure- or __Host- 
to prevent cookies from being overwritten by insecure sources

* Use __Host- for all cookies needed only on a specific domain (no subdomains) where Path is set to /
* Secure: they should only be sent over HTTPS
* HttpOnly: Cookies that don’t require access from JavaScript should be set with the HttpOnly flag
* SameSite: Forbid sending the cookie via cross-origin requests (such as from <img> tags, etc.), as a strong anti-CSRF measure

```bash
Set-Cookie: 
_Secure-
Max-Age=2592000; 
Path=/; 
Secure; 
HttpOnly; 
SameSite=Strict
```

## Cross-origin Resource Sharing (CORS)

* use `Access-Control-Allow-Origin` to manage CORS 
* use `integrity` to verify a resource is not modified on the way
* use `X-Frame-Options: DENY` to disallow allow attempts to iframe site (recommended)
 

an origin is a tuple of protocol:host:port

`Access-Control-Allow-Origin: https://x.com:8081`  only the specified origin can access  
`Access-Control-Allow-Origin: *` every origin can access

by default, browser XMLHttpRequest or fetch APIs allows same-origin only 

if the request has implications for user data, it is first preflighted with HTTP OPTIONS header, only after the real request is sent 

[visit mozilla for more on CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
)

## Cross-site scripting XSS 

an attacker to injects malicious code into a website and user's browser executes it 

1. validate and encode. For example `<script>` would be encoded as `&lt;script&gt;`

2. set `Content Security Policy` so the browser will run only allow the white-listed scripts

## Content Security Policy

used to whitelist scripts and assets 

when a webserver adds a CSP response header, 
the browser will run only allow the white-listed scripts and assets 

Disabling inline JavaScript means that all JavaScript must be loaded from script src tags 

By using CSP to disable inline JavaScript, you can effectively eliminate almost all XSS attacks against your site.

example CSP

```bash
Content-Security-Policy: 
default-src 'none'; 
font-src 'https://fonts.googleapis.com';
img-src 'self' https://i.imgur.com; 
object-src 'none'; 
script-src 'self'; 
style-src 'self';
```


## Visit for more 
[https://stackoverflow.com/questions/tagged/security](https://stackoverflow.com/questions/tagged/security
)

a great list at [https://stackoverflow.com/questions/2794016/what-should-every-programmer-know-about-security](https://stackoverflow.com/questions/2794016/what-should-every-programmer-know-about-security
)

[https://stackoverflow.com/questions/1469899/worst-security-hole-youve-seen?page=1&tab=votes#tab-top](https://stackoverflow.com/questions/1469899/worst-security-hole-youve-seen?page=1&tab=votes#tab-top)

