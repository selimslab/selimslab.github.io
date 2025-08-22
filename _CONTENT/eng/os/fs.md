---
---
file: array of bytes
inode: persistent struct with file metadata
fd: integer handle for open files
block levels: direct, indirect, double indirect for large files
mount point: dir where file sys is attached to tree

## fs api
open()
read()
lseek()
close()

atomic file updates
fsync()
rename()

mkdir
opendir
readdir
closedir

link()
unlink()

strace() syscall trace

## devices
block
character
pipe
socket

/dev/null
/dev/zero
/dev/random
