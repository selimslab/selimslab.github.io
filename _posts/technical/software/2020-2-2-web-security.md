---
layout: post
title: Web security best practices, one page summary 
tags: software
--- 
Simple steps for secure web apps 

## HTTPS
Use and redirect to HTTPS

Why HTTPS? Privacy, integrity, identity 

## CSRF 

3 key conditions
    1. A relevant action
    2. Only mechanism to track session is a cookie
    3. All request parameters predictable 

JWT is included in the Authorization header, browser can’t automatically generate this

So either use a session token or a CSRF token 


## Cross-site scripting

 an attacker to injects malicious code into a website 

common cause is the lack of validation or encoding. 

The user's browser cannot detect the malicious script is evil, and so gives it access to any cookies, session tokens, or other sensitive site-specific information, or lets the malicious script rewrite the HTML content.

#### Stored XSS Attacks

The injected script is stored permanently on the target servers.

#### Reflected XSS Attacks

When a user is tricked into clicking a malicious link, submitting a specially crafted form, or browsing to a malicious site, the injected code travels to the vulnerable website. The Web server reflects the injected script back to the user's browser, such as in an error message, search result, or any other response that includes data sent to the server as part of the request. The browser executes the code because it assumes the response is from a "trusted" server which the user has already interacted with.

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


## Cookies
All cookies must be set with the Secure flag, and set as restrictively as possible

Cookie names may be either be prepended with either __Secure- or __Host- to prevent cookies from being overwritten by insecure sources

* Use __Host- for all cookies needed only on a specific domain (no subdomains) where Path is set to /
* Secure: All cookies must be set with the Secure flag, indicating that they should only be sent over HTTPS
* HttpOnly: Cookies that don’t require access from JavaScript should be set with the HttpOnly flag
* SameSite: Forbid sending the cookie via cross-origin requests (such as from <img> tags, etc.), as a strong anti-CSRF measure


```bash
Set-Cookie: __Host-BMOSESSIONID=YnVnemlsbGE=; Max-Age=2592000; Path=/; Secure; HttpOnly; SameSite=Strict
```

## Cross-origin Resource Sharing (CORS)

an origin is a tuple of protocol:host:port

 `Access-Control-Allow-Origin: https://x.com:8081`  only the specified origin can access  
`Access-Control-Allow-Origin: *` every origin can access


## Subresource Integrity
 a security feature that enables browsers to verify a resource is not modified 
```bash
<script src="https://code.jquery.com/jquery-2.1.4.min.js"
  integrity="sha384-R4/ztc4ZlRqWjqIuvf6RX5yb/v90qNGx6fS48N0tRxiGkqveZETq72KgDVJCp2TC"
  crossorigin="anonymous"></script>
```


## X-Frame-Options: DENY
* DENY: disallow allow attempts to iframe site (recommended)

