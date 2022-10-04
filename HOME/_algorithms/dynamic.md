---
title: Dynamic

---



```
def dynamic(n):
    if base case:
        return  

    if n not in memo:
        memo[n] = recurrence relation 
    
    return memo[n]
```

```python
def fibonacci(n):
    if n < 2:
        return n
    if n not in memo.keys():
        memo[n] = fib(n - 1) + fib(n - 2)
    return memo.get(n)
```

{% for note in site.documents %}
{% if note.tags contains "dynamic" %}
<li>
    <a href="{{ note.url }}">{{ note.title  }}</a>
</li>
{% endif %}
{% endfor %}







