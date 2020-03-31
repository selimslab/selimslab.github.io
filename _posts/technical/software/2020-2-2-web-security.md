---
layout: post
title: Software Security 
tags: software
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
* Hiding secrets is hard - and secrets hidden in code won't stay secret for long
* Be careful to not check in secrets to public repos
* avoid security through obscurity 
* model possible threats
* ask what can go wrong? 
* write exploit code to test your patches 
* Security is a process, not a product
* no system is 100% secure, security is an example of "unknown unknowns"



a great list at https://stackoverflow.com/questions/2794016/what-should-every-programmer-know-about-security


## web specific  

1. use HTTPS 
2. don't Allow HTTP Access to Secure Pages
3. parametrize SQL quries to prevent SQL injection
4.  use 2-factor auth 
5.  enforce strong passwords
6.  add exponential delay to repeated login attempts
7.  lock account after repeated failed login attempts 
8.  use CSRF tokens with forms
9.  set `Content Security Policy` to prevent XSS 
10. use `SameSite` header to forbid sending the cookie via cross-origin requests, as an additional CSRF mesaure
11. prepend cookies with __Secure to prevent them from being overwritten 
12. set cookies with `Secure` flag to ensure they can only be sent over HTTPS 
13. set HTTPOnly for cookies that don’t require access from JavaScript
14. use `Access-Control-Allow-Origin` to manage CORS 
15. use `integrity` to verify a resource is not modified on the way
16. use `X-Frame-Options: DENY`to disallow allow attempts to iframe site (recommended)
 

## Cross-site request forgery CSRF 

https://portswigger.net/web-security/csrf

3 key conditions
    1. A relevant action
    2. Only mechanism to track session is a cookie
    3. All request parameters predictable 

JWT is included in the Authorization header, browser can’t automatically generate this

So either use a session token or a CSRF token 

CSRF tokens are large random values, unique per user & per user session



## Cross-site scripting XSS 

an attacker to injects malicious code into a website and user's browser executes it 

validate, encode, set `Content Security Policy`

For example <script> would be returned as &lt;script&gt;

## Content Security Policy

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