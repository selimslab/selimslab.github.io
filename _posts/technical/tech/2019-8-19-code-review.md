---
layout: post
title: Code Review 
tags: tech 
---

Summary of <a href="https://google.github.io/eng-practices/review/reviewer/looking-for.html">
https://google.github.io/eng-practices/review/reviewer/looking-for.html</a>

In doing a code review, you should make sure that:

The code is well-designed.

The functionality is good for the users of the code.

Any UI changes are sensible and look good.

Any parallel programming is done safely.

The code isn’t more complex than it needs to be.

The developer isn’t implementing things they might need in the future but don’t 
know they need now.

Code has appropriate unit tests.

Tests are well-designed.

The developer used clear names for everything.

Comments are clear and useful, and mostly explain why instead of what.

Code is appropriately documented (generally in g3doc).

The code conforms to our style guides.

Make sure to review every line of code you’ve been asked to review, look at the context, make sure you’re improving code health, and compliment developers on good things that they do.