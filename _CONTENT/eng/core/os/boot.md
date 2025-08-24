---
---
**power-on:** 
cpu starts at fixed fw address

**systemctl** 
init ram, cpu
discover bootable devices
loads boot sector to memory

**boot loader**
locates kernel on disk
loads into ram
jumps to kernel entry

**kernel init** 
switch cpu from legacy mode to protected/long mode

virtual mem
interrupt handlers

devices
drivers
root fs mount

systemd
user space starts

scheduler begins
user login

## user types
root/admin
full access

system users
service accounts
limited to specific services

regular users
only access own files and permitted resources

guest

## caps 
CAP_NET_ADMIN
CAP_SYS_ADMIN


## systemctl

```
systemctl
    status

    start
    stop
    restart

    enable
    disable

journalctl

systemd
    crond

    networkd
    dhcpd
    firewalld
    sshd

    udevd

    syslogd
    journald
```



