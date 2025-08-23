---
---
power-on: 
cpu starts at fixed fw address

bios: 
init ram, cpu
discover bootable devices
loads boot sector to memory

boot loader: 
locates kernel on disk
loads into ram
jumps to kernel entry

kernel init: 
switch cpu from legacy mode to protected/long mode
virtual mem
interrupt handlers
devices/drivers
root fs mount

init PID 1 systemd, user space starts
scheduler begins, user login
