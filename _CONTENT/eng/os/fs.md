---
---
1. Filesystem Hierarchy
2. Filesystem Types
3. Anatomy of a Disk
4. Disk Partitioning
5. Creating Filesystems
6. mount and umount
7. /etc/fstab
8. swap
9. Disk Usage
10. Filesystem Repair
11. Inodes
12. symlinks

## files
array of bytes

inodes: persistent struct with file metadata

file descriptor: integer handle for open files

filetypes: blocks, dirs, hardlinks, symlinks

block levels: direct, indirect, double indirect for large files

mount point: dir where file sys is attached to tree

## fs api
open() read() lseek() close()

fsync() and rename() for atomic file updates

mkdir, opendir, readdir, closedir

stat()

link() unlink()

strace() syscall trace

## devices
block
character
pipe
socket

/dev/null
/dev/zero
/dev/random
