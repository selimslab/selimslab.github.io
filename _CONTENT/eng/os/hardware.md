---
---
cpu
fetch-decode-execute
L1, L2 per core 64kb, 1mb
L3 shared 32mb

rings (x86/x64)
- Ring 0: kernel mode, direct hardware access, interrupt handling
- Ring 3: user mode, restricted, must use syscalls

ssd: sata | nvme
