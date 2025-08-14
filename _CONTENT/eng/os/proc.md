---
---
Load code, alloc mem, init stack

address space
- stack <- SP, stack pointer, in register
- heap
- code <- PC, program counter or IP, instruction pointer, in register
- data

save/load registers to switch ctx
time sharing
policy vs mechanism
signals

heap: new(), malloc()
fork, exec, wait

threads share address space

stack
- return address
- params
- open files
- local variables

pthread
create
join
mutex lock unlock
cond wait signal
