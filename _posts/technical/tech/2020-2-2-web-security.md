---
layout: post
title: Web security best practices, one page summary 
tags: tech
--- 
Simple steps for secure web apps 

## HTTPS
Use and redirect to HTTPS

Why HTTPS? Privacy, integrity, identity 

## Content Security Policy

Disabling inline JavaScript means that all JavaScript must be loaded from script src tags 

By using CSP to disable inline JavaScript, you can effectively eliminate almost all XSS attacks against your site.

``` shell script
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


```
Set-Cookie: __Host-BMOSESSIONID=YnVnemlsbGE=; Max-Age=2592000; Path=/; Secure; HttpOnly; SameSite=Strict
```

## Cross-origin Resource Sharing
```
Allow https://random-dashboard.mozilla.org to read the returned results of this API
Access-Control-Allow-Origin: https://random-dashboard.mozilla.org
```

## CSRF Prevention
SameSite and CSRF tokens

## Subresource Integrity
``` shell-script
<script src="https://code.jquery.com/jquery-2.1.4.min.js"
  integrity="sha384-R4/ztc4ZlRqWjqIuvf6RX5yb/v90qNGx6fS48N0tRxiGkqveZETq72KgDVJCp2TC"
  crossorigin="anonymous"></script>
```


## X-Frame-Options: DENY
* DENY: disallow allow attempts to iframe site (recommended)

