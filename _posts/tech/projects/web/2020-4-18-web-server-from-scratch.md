---
layout: post
title: a concurrent web server in 100 lines
tags: web
category: tech/projects

 

---

Written following [ruslan spivak's excellent series](https://ruslanspivak.com/lsbaws-part1/) and [jao ventura's blog post](http://joaoventura.net/blog/2017/python-webserver/)

concurrency strategy is using UNIX fork() syscall

<script src="https://gist.github.com/selimslab/a76b5fa001e4200262849968ad2b5eb7.js"></script>