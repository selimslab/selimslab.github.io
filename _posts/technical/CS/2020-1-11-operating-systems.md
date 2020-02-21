---
layout: post
title: Operating Systems  
tags: computers 
---

OS is the main program running on a computer, and enables other program to use the hardware 

Makes it easy to run programs 

Allows them to share memory 

Enables them to interact with devices 

To allow users to use OS, it exports a few hundred system calls or APIs.
Thus OS provides a standard library 

## 1. Virtualization
OS takes a physical resource like memory, disk, or CPU 
and turns it into a virtual form of itself  

## 2. Persistence
OS handles persistence with a filesystem

It abstracts the disk and providing a few simple system calls to create, delete, and update files and directories, read and write to files

## 3. Concurrency 
OS provides the illusion of doing many things at once by quickly switching between tasks.  

Concurrent is they are happening at once 

Parallel is a lot of things happening on many cores 

Since OS manages resources for concurrent operation, it's called a resource manager 

## Process and Thread
a process is simply a running program 
there is a stack per process 
a process have to be loaded into memory before CPU can run it 

Thread is a point of execution 
There will also be a stack per thread 

Each thread is like a separate process 
but they use the same address space, 
thus can access to the same data 

Threads are lighweight because they are already loaded in the memory with the main process

So there is no context switch cost 

Semaphore is a variable to control access to a common resource 

## deadlock
for deadlock, all 4 must hold 

Circular wait

No preemption

Mutual exclusion

Hold and wait 

## other 
There is also 
networking 
graphics 
security

