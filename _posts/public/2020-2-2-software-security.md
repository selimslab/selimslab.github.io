---
layout: post
title: Software Security 
tags: software recommended
category: tech
--- 

## Fundamentals 

Plan for security from the start. 

<br>

Keep it simple to keep the attack surface minimum. 

<br>

Model possible threats. 

Ask what can go wrong.  

<br>

Any user input is an attack vector. 

Never trust any input, always **validate**, always **sanitize**

<br>

Libraries and network calls are attack vectors.

Use well-known tried and tested libraries only and keep your libraries up to date 

<br>

No system is 100% secure, security is an example of "unknown unknowns"
 
Consider all cases, allow, disallow, exception

<br>

Enforce strong passwords, 

never keep plain-text passwords, 

do not encrypt passwords, 

hash them with a salt 

<br>

Write exploit code to test your patches 

<br>
  
**Don't try to roll your own** security solutions, it's a community effort 

**Log** suspicious activity like failed login attempts,invalid input, statistically rare or unexpected events 

<br>

Avoid security through obscurity 

Do not hide secrets in code, make sure they won't end up in public repos 

<br>

Be aware of buffer overflow attacks 

use **HTTPS**, don't allow HTTP access to secure pages


## authentication

Use **2-factor auth** 

Add exponential delay to repeated login attempts

Lock account after repeated failed login attempts 

## authorization

Use **authorization levels**. 

**Least privilege**, never grant more access than required. 

**Separation of privileges**, so your system is not all or nothing

Use allow-lists, not block-lists 

  
## SQL 

Parametrize **SQL** queries to prevent SQL injection



## Cookies

They are mainly used for managing sessions, tracking, and personalization

Prepend with `__Host-` to restrict cookie on a specific domain (no subdomains)

Prepend cookies with `__Secure-` to prevent them from being overwritten.  

`__Host-` prefix is stricter than `__Secure`

`Expires` set an expiration 

`Secure` header make cookies HTTPS 

`HTTPOnly` header to prevent JavaScript access

`SameSite` to prevent sending the cookie via cross-origin requests

```js
document.cookie = "_Host-username=Jane; Secure; HttpOnly; Path=/; SameSite=Strict";
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

an example CSP response header 

```bash
Content-Security-Policy: 
default-src 'none'; 
object-src 'none'; 
script-src 'self'; 
style-src 'self';
img-src 'self' 'https://i.imgur.com';
font-src 'https://fonts.googleapis.com';
```


## More resources

[https://stackoverflow.com/questions/tagged/security](https://stackoverflow.com/questions/tagged/security
)

[https://stackoverflow.com/questions/2794016/what-should-every-programmer-know-about-security](https://stackoverflow.com/questions/2794016/what-should-every-programmer-know-about-security
)

[https://stackoverflow.com/questions/1469899/worst-security-hole-youve-seen?page=1&tab=votes#tab-top](https://stackoverflow.com/questions/1469899/worst-security-hole-youve-seen?page=1&tab=votes#tab-top)

[Security books](https://utkusen.com/blog/guvenlik-kitaplari-hakkindaki-degerlendirmelerim.html)

[Pick a Vulnerability to Learn About](https://www.hacksplaining.com/lessons)

[security - The definitive guide to form-based website authentication - Stack Overflow](https://stackoverflow.com/questions/549/the-definitive-guide-to-form-based-website-authentication)


[Best practices for managing & storing secrets like API keys and other credentials \[2020\]](https://blog.gitguardian.com/secrets-api-management/#secrets-as-service)
