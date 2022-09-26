---
layout: post
title: Logos, a very basic operating system kernel from scratch
---

Modern life runs on computers, and they run on operating systems 

So how do they really work? What happens under the hood?

Questions follow each other. 

---

This is a project to understand and replicate the great [os-tutorial](https://github.com/cfenollosa/os-tutorial) 

Logos bootloads a kernel, connects to the keyboard and screen, and starts a basic shell 

<https://github.com/selimslab/logos>

---

These two books helped me a lot, as well as spending a few hours on [os-dev wiki](https://wiki.osdev.org/Main_Page) 


1. Operating Systems: From 0 to 1
2. Writing a Simple Operating System — from Scratch

---

Reading Operating Systems: Three Easy Pieces helped me cover more OS concepts, like scheduling, virtualization, file systems, concurrency, .. 


## Containers

Although OS provides process isolation, containers provide more isolation and ease on top of that  

[Containers From Scratch • Liz Rice • GOTO 2018](https://www.youtube.com/watch?v=8fi7uSYlOdc) is a great look under the hood for what really is a container 


```go
package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"syscall"
)

// go run main.go run <cmd> <args>
func main() {
	switch os.Args[1] {
	case "run":
		run()
	case "child":
		child()
	default:
		panic("help")
	}
}

func run() {
	fmt.Printf("Running %v \n", os.Args[2:])

	cmd := exec.Command("/proc/self/exe", append([]string{"child"}, os.Args[2:]...)...)
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags:   syscall.CLONE_NEWUTS | syscall.CLONE_NEWPID | syscall.CLONE_NEWNS,
		Unshareflags: syscall.CLONE_NEWNS,
	}

	must(cmd.Run())
}

func child() {
	fmt.Printf("Running %v \n", os.Args[2:])

	cg()

	cmd := exec.Command(os.Args[2], os.Args[3:]...)
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	must(syscall.Sethostname([]byte("container")))
	must(syscall.Chroot("/home/liz/ubuntufs"))
	must(os.Chdir("/"))
	must(syscall.Mount("proc", "proc", "proc", 0, ""))
	must(syscall.Mount("thing", "mytemp", "tmpfs", 0, ""))

	must(cmd.Run())

	must(syscall.Unmount("proc", 0))
	must(syscall.Unmount("thing", 0))
}

func cg() {
	cgroups := "/sys/fs/cgroup/"
	pids := filepath.Join(cgroups, "pids")
	os.Mkdir(filepath.Join(pids, "liz"), 0755)
	must(ioutil.WriteFile(filepath.Join(pids, "liz/pids.max"), []byte("20"), 0700))
	// Removes the new cgroup in place after the container exits
	must(ioutil.WriteFile(filepath.Join(pids, "liz/notify_on_release"), []byte("1"), 0700))
	must(ioutil.WriteFile(filepath.Join(pids, "liz/cgroup.procs"), []byte(strconv.Itoa(os.Getpid())), 0700))
}

func must(err error) {
	if err != nil {
		panic(err)
	}
}
```