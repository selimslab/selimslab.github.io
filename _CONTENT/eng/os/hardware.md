---
---
cpu
fetch-decode-execute

caches:
- L1, L2 per core 64kb, 1mb
- L3 shared 32mb

rings (x86/x64)
- Ring 0: Kernel mode/ Direct hardware access, memory management, interrupt handling
- Ring 3: User mode (lowest privilege), restricted access, must use syscalls

ssd: sata vs nvme
