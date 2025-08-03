---
---
## files 

array of bytes 

inode, filetypes, blocks, dirs, hardlinks, symlinks

block levels: direct, indirect, double indirect for large files 

file descriptor: integer handle for open files  

inodes: persistent struct with file metadata   

mount point: dir where file sys is attached to tree 

permission bits: rwx - read, write, execute 

rwx rwx rwx : owner group other

access control lists for more control: fs listacl

fsync() and rename() for atomic file updates 

open() read() lseek() close()

mkdir, opendir, readdir, closedir

stat()

link() unlink()

mkfs creates empty fs on partitions

strace() syscall tracing 

## devices 

block   
character   
pipe    
socket  

/dev/null, /dev/zero, /dev/random
