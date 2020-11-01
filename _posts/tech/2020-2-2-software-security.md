---
layout: post
title: Software Security 
tags: security 
category: tech
  
--- 

## Fundamentals 

Plan for security from the start. Model possible threats. Ask what can go wrong.  

Keep it simple to keep the attack surface minimum. Attack vectors include user input fields, protocols, interfaces, and services.

No system is 100% secure, security is an example of "unknown unknowns"
 
Fail securely. Consider all cases, allow, disallow, exception

Enforce strong passwords, never keep plain-text passwords, do not encrypt passwords, hash them with a salt 

Write exploit code to test your patches 
  
Never trust any input, always **validate**, always **sanitize**

**Don't try to roll your own** security solutions, it's a community effort 

Use well-known tried and tested libraries only and keep your libraries up to date 

**Log** suspicious activity like failed login attempts,invalid input, statistically rare or unexpected events 

Do not hide secrets in code, make sure they won't end up in public repos 

Use **authorization levels**. 

**Least privilege**, never grant more access than required. 

**Separation of privileges**, so your system is not all or nothing

Use **whitelists**, not blacklists 

Avoid security through obscurity 

Be aware of buffer overflow attacks 
  
use **HTTPS**, don't allow HTTP access to secure pages
  
Parametrize **SQL** queries to prevent SQL injection

Use **2-factor auth** 

Add exponential delay to repeated login attempts

Lock account after repeated failed login attempts 

## Cookies

Prepend cookies with `__Secure` to prevent them from being overwritten 

Prepend with `__Host-` to restrict cookie on a specific domain (no subdomains)

Add `Secure` header make cookies HTTPS 

Add `HTTPOnly` header to prevent JavaScript access

Add `SameSite` to prevent sending the cookie via cross-origin requests

```bash
Set-Cookie: 
_Secure-
Max-Age; 
Path=/; 
Secure; 
HttpOnly; 
SameSite=Strict
```

## Cross-site request forgery CSRF 

CSRF is forgery of a valid request. It is possible to forge a fake request if the only mechanism to track user session is a cookie and all request parameters predictable

To prevent it, we need at least one unpredictable parameter, a CSRF token. This token is a large random value, unique per user & per user session. Make sure your forms have CSRF tokens. 

CSRF tokens should not be sent within cookies. 

Use `SameSite` header to forbid sending the cookie via cross-origin requests 

[more on CSRF](https://portswigger.net/web-security/csrf)

## Cross-origin Resource Sharing (CORS)

an origin is a tuple of protocol:host:port

`Access-Control-Allow-Origin: https://x.com:8081`  only the specified origin can access  
`Access-Control-Allow-Origin: *` every origin can access

By default, browser XMLHttpRequest or fetch APIs allows same-origin only 

Use `Access-Control-Allow-Origin` to manage CORS 
Use `integrity` to verify a resource is not modified on the way
Use `X-Frame-Options: DENY` to disallow allow attempts to iframe site 

[more on CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
)

## Cross-site scripting XSS 

It is injecting malicious code into a website so user's browser executes it 

To prevent, validate and encode. For example `<script>` would be encoded as `&lt;script&gt;`

Set `Content Security Policy` header so the browser will run only allow the white-listed scripts and assets 

By using CSP to disable inline JavaScript, you can effectively eliminate almost all XSS attacks against your site.

Disabling inline JavaScript means that all JavaScript must be loaded from script src tags 

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


## More resources
[https://stackoverflow.com/questions/tagged/security](https://stackoverflow.com/questions/tagged/security
)

a great list at [https://stackoverflow.com/questions/2794016/what-should-every-programmer-know-about-security](https://stackoverflow.com/questions/2794016/what-should-every-programmer-know-about-security
)

[https://stackoverflow.com/questions/1469899/worst-security-hole-youve-seen?page=1&tab=votes#tab-top](https://stackoverflow.com/questions/1469899/worst-security-hole-youve-seen?page=1&tab=votes#tab-top)


[Pick a Vulnerability to Learn About](https://www.hacksplaining.com/lessons)

[security - The definitive guide to form-based website authentication - Stack Overflow](https://stackoverflow.com/questions/549/the-definitive-guide-to-form-based-website-authentication)
