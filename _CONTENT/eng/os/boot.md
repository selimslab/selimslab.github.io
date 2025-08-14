---
---
0. power-on: cpu starts at fixed address. it refers to firmware in motherboard mem
1. bios: inits ram, cpu, discovers bootable devices, loads boot sector to memory
2. boot loader: locates kernel on disk, loads into ram, jumps to kernel entry
3. kernel init: switch cpu from legacy mode to protected/long mode, setup virtual mem, interrupt handlers, ..
4. device/driver init
5. root fs mount
6. init PID 1 systemd: user space starts: daemons, syslogd, network, cron, ..
7. scheduler begins, user login

systemctl: status, start, stop, restart, enable, disable, ..
journalctl
