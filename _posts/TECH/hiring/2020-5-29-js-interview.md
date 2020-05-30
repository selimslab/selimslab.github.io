---
layout: post
title: JS Interview
tags: hiring
categories: Tech 
---

Some concepts to evaluate a candidate's depth in JS  


Js strength and weaknesses ?

what is V8 ?


## basic syntax

let, const 

-> arrow

... spread

## async 

callback

promise

async await 

## functional programming 

filter, map, reduce 

immutable values, pure functions, higher order functions, closures


## snippets 

```js
for (var i = 0; i < 5; i++) {
    setTimeout(function() { console.log(i); }, i * 1000 );
} 
// 5 5 5 5 5


// when you replace var with let 
for (let i = 0; i < 5; i++) {
    setTimeout(function() { console.log(i); }, i * 1000 );
} 
// 0 1 2 3 4 
```

The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?

```js

var list = readHugeList();

let nextListItem = function() {
    var item = list.pop();
    if (item) {
        // may cause a stack overflow
        nextListItem();
    }
};

let nextListItem = function() {
    var item = list.pop();
    if (item) {
        // fixed
        setTimeout( nextListItem, 0);
    }
};

```
