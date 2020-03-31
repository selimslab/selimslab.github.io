---
layout: post
title: Web security best practices, one page summary 
tags: software
--- 
to secure a web app 

1. use HTTPS 
2. do not trust user data
3. always validate
4. always sanitize on the server 
5. parametrize SQL quries to prevent SQL injection
6. never execute user provided data 
7. use strong admin passwords
8. do not roll your own encryption solutions
9. never keep plain-text passwords
10. do not encrypt passwords, hash them with a salt 
11. use authorization levels
12. use well-known tried and tested libraries only
13. keep your libraries up to date 
14. avoid security through obscurity 
15. use 2-factor auth if necessary 
16. enforce strong passwords
17. add exponential delay to repeated login attempts
18. keep a log of failed login attempts, invalid input, and other suspicious activity  
19. use CSRF tokens with forms 
20. set `Content Security Policy` to prevent XSS 
21. use `SameSite` header to forbid sending the cookie via cross-origin requests, as an additional CSRF mesaure
22. prepend cookies with __Secure to prevent them from being overwritten 
23. set cookies with `Secure` flag to ensure they can only be sent over HTTPS 
24. use `Access-Control-Allow-Origin` to manage CORS 
25. use `integrity` to verify a resource is not modified on the way
26. use `X-Frame-Options: DENY`to disallow allow attempts to iframe site (recommended)

 

## Cross-site request forgery CSRF 

https://portswigger.net/web-security/csrf

3 key conditions
    1. A relevant action
    2. Only mechanism to track session is a cookie
    3. All request parameters predictable 

JWT is included in the Authorization header, browser can’t automatically generate this

So either use a session token or a CSRF token 


## Cross-site scripting XSS 

an attacker to injects malicious code into a website and user's browser executes it 

validate, encode, set `Content Security Policy`

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