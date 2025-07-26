

## from scratch 
- Electric current: open/close, 0/1
- Base 2, boolean logic, AND, OR, NOT, IF, logic gates
- Mechanical switch → vacuum tube → transistor (npn, pnp)
- Memory cell → bit → byte
- Program: set of instructions
- Instruction: opcode and operand (e.g., LOAD 0010, PUSH, POP, JUMP)
- CPU: ALU, control unit, memory unit
- Memory, disk

## Process

address space 
- stack <- SP, stack pointer 
- heap
- code <- PC, program counter or IP, instruction pointer
- data

Thread is a process with a shared address space 

stack 
- return address
- params
- open files
- local variables

heap: new(), malloc()  

fork, exec, wait 

signals 


## CPU

caches: L1, L2 per core. L3 shared 

fetch-decode-execute

## sockets 

unix, ipv4, ipv6 sockets 

stream vs datagram sockets like tcp vs udp 

socket() -> bind() -> listen() -> accept()

read() write()  

send() recv()

## files 

array of bytes 

inodes 

access levels 


## containers 

Containers provide more process isolation, ease, and control on top of what OS provides  



