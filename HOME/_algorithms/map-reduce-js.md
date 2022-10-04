---
---

```js
function map(func, array) {
    var result = [];
    forEach(array, function (element) {
      result.push(func(element));
    });
    return result;
  }
  
  show(map(Math.round, [0.01, 2, 9.89, Math.PI]));


  function reduce(combine, base, array) {
    // or fold in lisp 
    forEach(array, function (element) {
      base = combine(base, element);
    });
    return base;
  }
  
  function add(a, b) {
    return a + b;
  }
  
  function sum(numbers) {
    return reduce(add, 0, numbers);
  }
  
  // or 
  
  var array = [1, 2, 3, 4]
  
  const sum = (acc, value) => acc + value
  const product = (acc, value) => acc * value
  
  var sumOfArrayElements = array.reduce(sum, 0)
  var productOfArrayElements = array.reduce(product, 1)
```