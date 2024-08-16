---

---

![](assets/static/img/2-factor-auth.jpeg)

Practically, the auth info provided is either 
1. something the user knows (like a password, PIN, or key)
2. something the user has (like a smart card or proof of possession of a smart phone)
3. something the user is (like the user's fingerprint, voice, or face)

Keys are more general, passwords are more specific 

For example a million users of a website can verify the site with a single certificate, while each user have their own password 


## Some auth good practices

Use 2-factor  

Add exponential delay to repeated login attempts

Lock account after repeated failed login attempts 

Use authorization levels. 

Least privilege, never grant more access than required. 

Separation of privileges, so your system is not all or nothing

Use allow-lists, not block-lists 


## MS auth 

1. Manage redirect URIs:
    1. Own and update DNS records
    1. Avoid wildcards in URIs
    1. Ensure HTTPS for web app URIs
    1. Use platform-specific or random URIs for public clients
    1. Utilize specific URI for isolated web agents
    1. Regularly review and remove unused URIs
1. Directory app registration:
    1. Minimize and manually monitor owners
1. OAuth2 implicit grant flow:
    1. Enable only when explicitly required
1. Avoid resource owner password credential flow (ROPC):
    1. Use more secure authentication flows
    1. Consider specific scenarios like DevOps
1. Protect confidential app credentials:
    1. Prefer certificate credentials over passwords
    1. Avoid manual setting of passwords
    1. Use Azure Key Vault or managed identities for storage and rotation
1. Request least privilege permissions:
    1. Only request necessary permissions
    1. Understand application vs delegated permissions
1. Secure API permissions
    1. Define permissions granularly
    1. Admin consent for critical permissions
    1. Validate expected permissions in tokens before authorization

1. Use modern authentication solutions (OAuth 2.0, OpenID Connect) for user sign-ins.
1. Leverage Microsoft Authentication Library (MSAL) instead of direct protocol programming.
1. Do not parse or rely on access tokens in client applications; use ID tokens for user-related information.
1. Migrate apps from Azure AD Authentication Library (ADAL) to MSAL for improved security and support.
1. Configure mobile apps with broker redirect URIs for single sign-on using Microsoft Authenticator or Company Portal.
1. Maintain one token cache per account in web apps and web APIs for efficient token management.
1. Request data permissions through Microsoft Graph endpoint for integrated data access.

1. Understand and configure consent prompts to inform end users and admins adequately.
1. Minimize user login prompts by using silent authentication wherever possible.
1. Avoid using "prompt=consent" unnecessarily; use it only when additional permissions are required.
1. Enrich application functionality with user data via Microsoft Graph API.
1. Register all necessary permissions for easy admin consent and use incremental consent for user understanding.
1. Implement a seamless single sign-out experience for privacy, security, and user satisfaction.