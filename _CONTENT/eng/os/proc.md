---
---
Load code, alloc mem, init stack, PC and SP in registers, code and data in address space

save/load registers to switch ctx 

time sharing 

policy vs mechanism 

process api

Process Control Block (PCB) tracks all proc info 

zombie children to preserve return value until parent calls wait()

address space 
- stack <- SP, stack pointer 
- heap
- code <- PC, program counter or IP, instruction pointer
- data

heap: new(), malloc()  

fork, exec, wait 

signals 


## threads 

Threads share address space 

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

