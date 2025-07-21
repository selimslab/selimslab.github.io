# Files and Directories Summary

## Core Abstractions

### Files
- **Definition**: Array of bytes that can be created, read, written, and deleted
- **Low-level name**: Inode number (i-number) - unique identifier within file system
- **Structure**: OS typically doesn't understand file contents; just stores data persistently
- **Naming convention**: Often has extension (e.g., .c, .jpg, .mp3) but not enforced

### Directories
- **Definition**: Special file containing list of (user-readable name, low-level name) pairs
- **Contents**: Maps human-readable names to inode numbers
- **Structure**: Can contain files or other directories
- **Hierarchy**: Forms directory tree starting from root (/)

## File System Interface

### Creating Files
```c
int fd = open("foo", O_CREAT|O_WRONLY|O_TRUNC, S_IRUSR|S_IWUSR);
```
**Flags**:
- `O_CREAT`: Create file if doesn't exist
- `O_WRONLY`: Write-only access
- `O_TRUNC`: Truncate to zero bytes if exists
- **Permissions**: `S_IRUSR|S_IWUSR` (readable/writable by owner)

**File Descriptors**:
- Integer returned by open(), private per process
- Acts as capability/handle for file operations
- Standard descriptors: 0 (stdin), 1 (stdout), 2 (stderr)
- New files typically get descriptor 3+

### Reading and Writing Files

**Reading**:
```c
read(fd, buffer, size);  // Returns bytes read
```

**Writing**:
```c
write(fd, buffer, size); // Returns bytes written
```

**Example trace** (from `cat foo`):
```
open("foo", O_RDONLY|O_LARGEFILE) = 3
read(3, "hello\n", 4096) = 6
write(1, "hello\n", 6) = 6
read(3, "", 4096) = 0        // EOF
close(3) = 0
```

### Random Access with lseek()
```c
off_t lseek(int fd, off_t offset, int whence);
```
**whence options**:
- `SEEK_SET`: Set to offset bytes
- `SEEK_CUR`: Current position + offset
- `SEEK_END`: File size + offset

**Important**: `lseek()` only changes OS memory variable, doesn't perform disk seek

## Data Structures

### Open File Table
Each process maintains array of file descriptors pointing to system-wide open file table:

```c
struct proc {
    struct file *ofile[NOFILE]; // Open files array
};

struct file {
    int ref;              // Reference count
    char readable;        // Read permission
    char writable;        // Write permission
    struct inode *ip;     // Points to inode
    uint off;            // Current offset
};
```

### File Sharing Examples

**Sequential reading** (300-byte file, 100-byte chunks):
```
fd = open("file", O_RDONLY);     // fd=3, offset=0
read(fd, buffer, 100);           // returns 100, offset=100
read(fd, buffer, 100);           // returns 100, offset=200
read(fd, buffer, 100);           // returns 100, offset=300
read(fd, buffer, 100);           // returns 0 (EOF), offset=300
```

**Multiple opens** (independent offsets):
```
fd1 = open("file", O_RDONLY);    // fd=3, OFT[10], offset=0
fd2 = open("file", O_RDONLY);    // fd=4, OFT[11], offset=0
read(fd1, buffer1, 100);         // OFT[10] offset=100, OFT[11] offset=0
read(fd2, buffer2, 100);         // OFT[10] offset=100, OFT[11] offset=100
```

## Advanced File Operations

### Shared File Table Entries

**fork() sharing**:
- Parent and child share same open file table entry
- Changes to offset affect both processes
- Reference count tracks sharing

**dup() system call**:
```c
int fd2 = dup(fd);  // fd and fd2 refer to same open file table entry
```

### Forcing Writes to Disk
```c
fsync(fd);  // Forces all dirty data to disk before returning
```
**Important**: Also need to fsync() parent directory for newly created files

### Atomic File Updates
```c
// Safe file update pattern
int fd = open("foo.txt.tmp", O_WRONLY|O_CREAT|O_TRUNC, perms);
write(fd, buffer, size);
fsync(fd);
close(fd);
rename("foo.txt.tmp", "foo.txt");  // Atomic swap
```

## File Metadata

### stat() System Call
```c
struct stat {
    dev_t st_dev;        // Device ID
    ino_t st_ino;        // Inode number
    mode_t st_mode;      // Permissions
    nlink_t st_nlink;    // Hard link count
    uid_t st_uid;        // Owner user ID
    gid_t st_gid;        // Owner group ID
    off_t st_size;       // Size in bytes
    time_t st_atime;     // Last access time
    time_t st_mtime;     // Last modification time
    time_t st_ctime;     // Last status change time
};
```

## Directory Operations

### Creating Directories
```c
mkdir("dirname", 0777);
```
**Default contents**: 
- `.` (refers to itself)
- `..` (refers to parent)

### Reading Directories
```c
DIR *dp = opendir(".");
struct dirent *d;
while ((d = readdir(dp)) != NULL) {
    printf("%lu %s\n", d->d_ino, d->d_name);
}
closedir(dp);
```

```c
struct dirent {
    char d_name[256];           // Filename
    ino_t d_ino;               // Inode number
    off_t d_off;               // Offset to next entry
    unsigned short d_reclen;    // Record length
    unsigned char d_type;       // File type
};
```

### Deleting Directories
```c
rmdir("dirname");  // Directory must be empty (only . and ..)
```

## Link Types

### Hard Links
```c
link("oldpath", "newpath");
```
**Characteristics**:
- Multiple names for same inode
- Same inode number for all hard links
- Reference count tracks number of links
- File deleted only when reference count reaches 0
- Cannot link to directories or across file systems

**Example**:
```bash
echo hello > file
ln file file2
ls -i file file2
# Output: 67158084 file  67158084 file2
```

### Symbolic (Soft) Links
```c
symlink("target", "linkname");
```
**Characteristics**:
- Separate file containing pathname of target
- Different file type (shows as 'l' in ls -l)
- Can link to directories and across file systems
- Can create dangling references if target deleted
- Size equals length of target pathname

**Example**:
```bash
ln -s file file2
ls -l file2
# Output: lrwxrwxrwx ... file2 -> file
```

## File Removal
```c
unlink("filename");  // Decrements reference count, removes directory entry
```
**Process**:
1. Removes directory entry (human-readable name)
2. Decrements inode reference count
3. If reference count reaches 0, frees inode and data blocks

## Permissions and Security

### Permission Bits
Format: `rwxrwxrwx` (owner, group, other)
- `r` (4): Read permission
- `w` (2): Write permission  
- `x` (1): Execute permission

**Example**:
```bash
chmod 600 file.txt    # rw------- (owner read/write only)
chmod 755 script.sh   # rwxr-xr-x (owner full, others read/execute)
```

**Execute bit behavior**:
- **Files**: Determines if file can be run as program
- **Directories**: Allows cd into directory and file creation (with write bit)

### Access Control Lists (ACLs)
More sophisticated than permission bits:
```bash
fs listacl private/
# Access list for private is
# Normal rights:
#   system:administrators rlidwka
#   remzi rlidwka

fs setacl private/ andrea rl  # Grant read/lookup to andrea
```

## Security Vulnerabilities

### TOCTTOU (Time of Check to Time of Use)
**Problem**: Gap between security check and file operation allows malicious changes

**Example attack**:
1. Mail server checks if inbox is regular file owned by user
2. Attacker renames inbox to point to `/etc/passwd`
3. Mail server writes to `/etc/passwd` instead of inbox

**Mitigations**:
- Reduce privileged services
- Use `O_NOFOLLOW` flag
- Transactional file systems (not widely deployed)

## File System Management

### Creating File Systems
```bash
mkfs -t ext3 /dev/sda1  # Creates empty file system on partition
```

### Mounting File Systems
```bash
mount -t ext3 /dev/sda1 /home/users  # Mounts file system at mount point
```

**Effect**: Makes file system accessible under unified directory tree

**Example mount output**:
```
/dev/sda1 on / type ext3 (rw)
proc on /proc type proc (rw)
sysfs on /sys type sysfs (rw)
tmpfs on /dev/shm type tmpfs (rw)
```

## Key Terminology

- **File**: Array of bytes with low-level name (i-number)
- **Directory**: Collection of (name, i-number) pairs
- **File descriptor**: Integer handle for accessing open files
- **Open file table**: System-wide table tracking file access state
- **Inode**: Persistent data structure storing file metadata
- **Hard link**: Additional directory entry pointing to same inode
- **Symbolic link**: File containing pathname to another file
- **Mount point**: Directory where file system is attached to tree

## Performance and Reliability Considerations

1. **Buffering**: File system buffers writes in memory for performance
2. **Consistency**: Use `fsync()` for guaranteed persistence
3. **Atomicity**: Use `rename()` for atomic file updates
4. **Reference counting**: Enables safe file sharing and cleanup
5. **Unified namespace**: Mount system provides single directory tree
6. **Access control**: Permission bits and ACLs protect file access

This file system interface provides the foundation for all higher-level file operations, balancing simplicity with powerful abstractions for organizing and accessing persistent data. 