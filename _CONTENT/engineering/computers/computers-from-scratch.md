---
---


writing numbers 

## electricity 

electron movement = current 

the cause of electron movement can be magnetism + moving parts or chemical 

no current/current - open/close - 0/1 

## logic 

base 2, boolean logic, AND OR NOT IF, logic gates 

mechanical switch -> vacuum tube -> transistor npn pnp 

memory cell -> bit -> byte

## data types
 
int long short double 

bool

float decimal 

char string 

unicode utf8

## program 

A program is a set of instructions. It has code and data  

An instruction has an opcode and operand 

    LOAD 0010

    ADD 0001 0100 

    PUSH 

    POP

    JUMP 

CPU runs a fetch decode execute loop for instructions

memory, disk, CPU (ALU + control unit + memory unit)

Programming languages implement features like conditionals, variables, loops, etc. by using basic instructions

    conditionals -> jump & jump if not true 

    variables -> binding, SET&GET, symbol table in VM    

    loops -> if & jump 

Expressions 

Process is the OS abstraction for a running program

Thread is a process with a shared address space 

Stack pointer SP

Instruction pointer(program counter) PC or IP 


## address space 

stack 

heap 

code 

data 


### stack 

return address

params 

open files 

local variables 

### heap 
new()

malloc()  

## interpreter 

tokenize

parse tokens to nodes

create AST, a tree of nodes 

take a walk and eval 

## compiler 

tokenize 

parse tokens to nodes
 
create AST or another IR 

emit bytecodes

## VM 

execute bytecodes 

can be a stack or register machine 

java compiler vs jvm

c# compiler vs CLR

PVM 

## OS 

bios 

bootloader 

kernel 

user space 

virtual memory 

file system 

virtual cpu 

context switching, scheduling 

mutex, semaphore 

fork, exec, wait 

signals 



Computer architecture/ cpu, gpu, ram, L1, L2 caches, assembly, fetch-decode-execute, stack, registers 

Assembly, C, bootloader, kernel, shell, 

virtual memory, memory protection 

context switching, scheduling 

file system 

program, code, data, stack, heap, program counter

static vars and func inputs and returns on the stack, dynamically allocated data on the heap  

pointer, call by value/reference

Garbage collection 

critical section, sync mechanisms, locks(mutex, semaphore), immutable vars, read/write locks, condition vars, message passing, futures/promises 

data storage, memory vs file vs DB 

OOP, SOLID, functional/event-driven/declarative programming 

Relational DBs, SQL, NoSQL

Networking, ethernet, TCP/IP, packet switching, UDP, HTTP 

HTTP vs HTTPS, public key cryptography

websocket 

API design, HTTP codes, paging, versioning, security 



