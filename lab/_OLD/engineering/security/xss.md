---
title: Cross-site scripting  


---

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