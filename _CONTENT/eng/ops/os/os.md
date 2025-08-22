---
---
root/admin: full access

system users/service accounts: limited to specific services

regular users: only access only files and permitted resources

guest: minimal perms.

CAP_NET_ADMIN
CAP_SYS_ADMIN

---

systemctl: 
status
start
stop
restart
enable
disable
..

journalctl

## daemons
systemd

crond

dhcpd
networkd
sshd
firewalld

udevd

syslogd
journald