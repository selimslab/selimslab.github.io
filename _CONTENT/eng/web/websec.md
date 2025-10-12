---
---
## Cert.
CA signs that a website owns the private key for their public key
CAs form a tree. Browser and OS have some root CAs pre-config.

## Cookies
You can restrict them to a domain, expire, require https, block js access, etc.

## CORS
Cross-origin Resource Sharing

Control allowed origins `protocol:host:port`
`Access-Control-Allow-(origin-methods-headers)`

fetch api same-origin only by default

You can verify resource `integrity` or disallow iframes

## CSRF
Cross-site request forgery
Forging of a valid request.
Having an unpredictable request parameter (CSRF token) prevents this.
Token is a large random value, unique per user and session.

## XSS: Cross-site scripting
code injection
Disable inline js so all js must be loaded from script tags.
Allow-list scripts and assets in `Content Security Policy` header.
Validate and encode inputs. For example `<script>` would be encoded as `&lt;script&gt;`
