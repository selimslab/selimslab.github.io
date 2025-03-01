---
---


numbers 

writing 

electricity 

electron movement = current 

the cause of electron movement can be magnetism + moving parts or chemical 

no current/current 

open/close

0/1 

base 2 

boolean logic, AND OR NOT IF 

mechanical switch 

vacuum tube 

transistor npn pnp 

logic gates 

memory cells

bit 

byte

## Data types 
 
Everything is bytes in memory. We define how should the computer interpret bytes. 
For example, take the byte 0101001. If looked as text, it's the letter 'A'. The computer could interpret it as a color pixel if the same byte were in a movie file, or as part of a song. 

int 

unsigned int 

long 

short 

double 

float 

decimal 

bool 

char 

string 

unicode 

utf8

## Computer organization 

fetch-decode-execute 

CPU =  ALU + control unit + memory unit 

memory 

disk 


## Instructions

opcode operand 

LOAD 0010

ADD 0001 0100 

PUSH 

POP

JUMP 

conditionals -> jump & jump if not true 

variables -> binding, SET&GET, symbol table in VM    

loops -> if & jump 

expressions 

## Program 

a set of instructions 

code 

data 

## Process

the OS abstraction for a running program, PID 

thread is a process with a shared address space 

stack pointer SP

instruction pointer(program counter) PC or IP 

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

examples 

java compiler vs jvm

c# compiler vs CLR

PVM 

## OS 

bios 

bootloader 

kernel 

user space 

## Kernel 

virtual memory 

file system 

virtual cpu 


## Concurrency control 

mutex 

semaphore 

## Policies 

Scheduling 

## Mechanisms 

## Process api 

fork, exec, wait 

signals 


