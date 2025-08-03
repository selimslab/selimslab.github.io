---
---
## boot 

1. bios 
2. boot loader
3. kernel init 
4. device/driver init 
5. root fs mount 
6. init PID 1, user space starts
7. user login 


## user space startup 
1. init PID 1 systemd 
2. low level: daemons, syslogd
3. network config 
4. mid level: like cron 
5. high level: login prompt, gui, apps


systemd is the first process. manages units like .service .socket .mount 

config in /etc/systemd/system/

systemctl: status, start, stop, restart, enable, disable, ..

journalctl 





⏺ Power-On Reset:
  1. CPU hardware forces execution to fixed reset vector address
  2. This address contains firmware (BIOS/UEFI) stored in motherboard flash memory

  Firmware Stage:
  1. Initializes basic hardware (RAM, CPU, chipset)
  2. Discovers bootable storage devices
  3. Loads first sector (boot sector) from chosen device into RAM
  4. Transfers control to loaded bootloader code

  Bootloader Stage:
  1. Small program that understands filesystems
  2. Locates kernel image file on disk
  3. Loads kernel binary into memory at predetermined address
  4. Sets up basic memory layout for kernel
  5. Jumps execution to kernel's entry point

  Kernel Initialization:
  1. Switches CPU from legacy mode to protected/long mode
  2. Sets up virtual memory system
  3. Initializes interrupt handling
  4. Probes and initializes hardware devices
  5. Mounts root filesystem
  6. Creates first userspace process (init)
  7. Scheduler begins managing processes

  Key Concept:
  Each stage is a "chain of trust" - one component loads and validates the next,
  then hands over CPU control. The CPU simply executes whatever instructions are at
   the memory address it's told to jump to. There's no inherent "kernel mode" until
   the kernel itself establishes privilege levels.