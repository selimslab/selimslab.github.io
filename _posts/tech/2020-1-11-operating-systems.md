---
layout: post
title: Operating Systems, 3 pillars
tags: operating-systems
category: tech
 
---

OS is the main program running on a computer. It enables other programs to use the hardware, share memory, interact with devices. It exports system calls, thus OS provides a standard library 

## 1. Virtualization
OS takes a physical resource like memory, disk, or CPU 
and turns it into a virtual form of itself. 

For example, it might take a 4GB memory and creates virtual memory pages of size 4KB. So each process runs in its sandboxed memory. This is memory safety and ensures that apps can only read their own data. 

## 2. Persistence
OS handles persistence with a filesystem

It abstracts the disk and providing a few simple system calls to create, delete, and update files and directories, read and write to files

## 3. Concurrency 
OS provides the illusion of doing many things at once by quickly switching between tasks.  

Since OS manages resources for concurrent operation, it's called a resource manager 

 