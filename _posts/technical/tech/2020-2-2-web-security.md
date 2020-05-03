---
layout: post
title: Software Security 
tags: tech
--- 
## general 

* Plan for security from the start
* Keep the attack surface minimum. Keep it simple. Attack vectors include user input fields, protocols, interfaces, and services.
* Fail securely, consider all 3 cases, allow, disallow, exception 
* use strong passwords
* never keep plain-text passwords
* use whitelists, not blacklists 
* never trust any input, always validate, always sanitize
* don't try to roll your own security solutions, it's a community effort 
* don't write your own crypto
* do not encrypt passwords, hash them with a salt 
* use authorization levels
* Least privilege, never grant more access than required
* Separation of Privileges, so your system is not all or nothing
* use well-known tried and tested libraries only
* keep your libraries up to date 
* log suspicious activity, like failed login attempts, invalid input, statistically rare or unexpected events 
* be aware of buffer overflow attacks 
* Hiding secrets is hard - and secrets hidden in code won't stay secret for long
* Be careful to not check in secrets to public repos
* avoid security through obscurity 
* model possible threats
* ask what can go wrong? 
* write exploit code to test your patches 
* Security is a process, not a product
* no system is 100% secure, security is an example of "unknown unknowns"

https://stackoverflow.com/questions/tagged/security

a great list at https://stackoverflow.com/questions/2794016/what-should-every-programmer-know-about-security


https://stackoverflow.com/questions/1469899/worst-security-hole-youve-seen?page=1&tab=votes#tab-top

## web specific  

* use HTTPS 
* don't allow HTTP access to secure pages
* parametrize SQL queries to prevent SQL injection
* use 2-factor auth 
* enforce strong passwords
* add exponential delay to repeated login attempts
* lock account after repeated failed login attempts 
* use CSRF tokens with forms
* set `Content Security Policy` to prevent XSS 
* use `SameSite` header to forbid sending the cookie via cross-origin requests, as an additional CSRF mesaure
* prepend cookies with __Secure to prevent them from being overwritten 
* set cookies with `Secure` flag to ensure they can only be sent over HTTPS 
* set HTTPOnly for cookies that don’t require access from JavaScript
* use `Access-Control-Allow-Origin` to manage CORS 
* use `integrity` to verify a resource is not modified on the way
* use `X-Frame-Options: DENY` to disallow allow attempts to iframe site (recommended)
 

## Attacks

### SQL injection

parametrize SQL queries, do not trust user input, validate, sanitize


### Cross-site request forgery CSRF 

https://portswigger.net/web-security/csrf

3 key conditions
    1. A relevant action
    2. Only mechanism to track session is a cookie
    3. All request parameters predictable 

su use a CSRF token, they are large random values, unique per user & per user session

CSRF tokens should not be transmitted within cookies.


## Cross-site scripting XSS 

an attacker to injects malicious code into a website and user's browser executes it 

validate and encode

For example `<script>` would be encoded as `&lt;script&gt;`

set `Content Security Policy`



## Concepts

### Content Security Policy

when a webserver adds a CSP response header, the browser will run only allow the white-listed scripts and assets 

Disabling inline JavaScript means that all JavaScript must be loaded from script src tags 

By using CSP to disable inline JavaScript, you can effectively eliminate almost all XSS attacks against your site.

```bash
# Disable unsafe inline/eval and plugins, only load scripts and stylesheets from same origin, fonts from google,
# and images from same origin and imgur. Sites should aim for policies like this.
Content-Security-Policy: default-src 'none'; font-src 'https://fonts.googleapis.com';
			 img-src 'self' https://i.imgur.com; object-src 'none'; script-src 'self'; style-src 'self'
```

## Cross-origin Resource Sharing (CORS)

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

an origin is a tuple of protocol:host:port

`Access-Control-Allow-Origin: https://x.com:8081`  only the specified origin can access  
`Access-Control-Allow-Origin: *` every origin can access

by default, browser XMLHttpRequest or fetch APIs allows same-origin only 

if the request has implications for user data, it is first preflighted with HTTP OPTIONS header, only after the real request is sent 

## Cookies

All cookies must be set with the Secure flag, and set as restrictively as possible

Cookie names may be either be prepended with either __Secure- or __Host- to prevent cookies from being overwritten by insecure sources

* Use __Host- for all cookies needed only on a specific domain (no subdomains) where Path is set to /
* Secure: they should only be sent over HTTPS
* HttpOnly: Cookies that don’t require access from JavaScript should be set with the HttpOnly flag
* SameSite: Forbid sending the cookie via cross-origin requests (such as from <img> tags, etc.), as a strong anti-CSRF measure

```bash
Set-Cookie: __Host-BMOSESSIONID=YnVnemlsbGE=; Max-Age=2592000; Path=/; Secure; HttpOnly; SameSite=Strict
```