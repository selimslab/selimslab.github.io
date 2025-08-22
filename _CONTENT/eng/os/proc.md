---
---
Load code, alloc mem, init stack

address space
stack < SP [return address, open files, params, local vars]
heap
code < PC
data

in registers
SP stack pointer 
PC program counter or IP instruction pointer

time sharing
save/load registers to switch ctx

policy vs mechanism
signals

heap: new(), malloc()

fork, exec, wait

threads share address space
pthread
create
join
mutex lock unlock
cond wait signal

