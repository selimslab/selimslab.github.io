---
layout: post
title: Web Security 
--- 


## Auth

Use 2-factor  

Add exponential delay to repeated login attempts

Lock account after repeated failed login attempts 

Use authorization levels. 

Least privilege, never grant more access than required. 

Separation of privileges, so your system is not all or nothing

Use allow-lists, not block-lists 

  
## SQL 

Parametrize queries to prevent SQL injection

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

CSRF is forgery of a valid request.

It is possible to forge a fake request if 
1. the only mechanism to track user session is a cookie,
2. all request parameters predictable

To prevent it, we need at least one unpredictable parameter, a CSRF token. 

This token is a large random value, unique per user & per user session. 

Make sure your forms have CSRF tokens. 

<br>

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

Set `Content Security Policy` header 

so the browser will run only allow the white-listed scripts and assets 

By using CSP to disable inline JavaScript, you can effectively eliminate almost all XSS attacks against your site.

Disabling inline JavaScript means that all JavaScript must be loaded from script src tags.

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


## More 

[Pick a Vulnerability to Learn About](https://www.hacksplaining.com/lessons)

[Best practices for managing & storing secrets like API keys and other credentials \[2020\]](https://blog.gitguardian.com/secrets-api-management/#secrets-as-service)

<https://stackoverflow.com/questions/2794016/what-should-every-programmer-know-about-security>

<https://stackoverflow.com/questions/tagged/security>