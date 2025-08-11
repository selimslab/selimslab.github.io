---
---
user levels:
- root/admin: full access
- system users/service accounts: limited to specific services
- regular users: only access only files and permitted resources
- guest: minimal perms.

caps: CAP_NET_ADMIN, CAP_SYS_ADMIN, ..


---

file permission bits: rwx - read, write, execute

rwx rwx rwx : owner group other

access control lists for more control: fs listacl
