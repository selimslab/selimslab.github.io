
Using a framework or off-the-shelf identity solution still requires you to handle many issues. Avoid building an identity system from scratch.

**Avoid storing credentials**

Running your identity system means storing a database of credentials. Never store credentials in clear text or encrypted form. Consider cryptographically hashing and salting credentials before storage. Even then, credentials remain vulnerable. Credential storage is a liability. IDaaS platforms securely manage credentials.

**Implement identity and federation protocols**

Modern identity protocols like OAuth 2 and OpenID Connect are complex. Industry experts designed them to mitigate real-world attacks. These protocols evolve with technology and user expectations. Identity specialists implement and validate these protocols best. Federation protocols are also complex and need specialist knowledge.

**Adopt modern identity features**

Users expect advanced features like:

- Passwordless authentication
- Single sign-on (SSO)
- Multifactor authentication (MFA)
- Auditing
- Conditional access
- Just-in-time access control

Building these features yourself is difficult. IDaaS platforms offer improved security features like:

- Detection of risky sign-in events
- Detection of impossible travel
- Detection of common credentials
- Machine learning classification of sign-in attempts
- Dark web monitoring for leaked credentials
- Ongoing threat monitoring

Building your identity system means missing out on these features.

**Use a reliable, high-performance identity system**

Identity systems must be reliable. If unavailable, your solution may degrade or fail. IDaaS with service level agreements (SLA) ensure operational reliability. For example, Microsoft Entra ID offers an SLA for uptime. Identity systems must perform well and scale with growth. IDaaS systems handle large user loads and absorb attack traffic.

**Test your security and apply tight controls**

Running your identity system requires you to keep it secure. Implement controls like:

- Periodic penetration testing
- Vetting employees
- Tight change control

These controls are expensive and complex.

**Use cloud-native security controls**

Using Microsoft Entra ID allows you to use cloud-native security features like managed identities for Azure resources. If using a separate identity platform, integrate managed identities with your identity solution.

**Focus on your core value**

Maintaining a secure, reliable, and responsive identity platform is expensive. Identity systems don’t add value to your solution or differentiate you from competitors. Outsource your identity needs to experts to focus on adding business value for customers.