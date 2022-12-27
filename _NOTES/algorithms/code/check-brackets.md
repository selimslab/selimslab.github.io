---
tags: str stack
layout: code

---



```python
def check_brackets(test_iterable):
    if len(test_iterable) % 2 != 0:
        return False

    pairs = {"{": "}", "[": "]", "(": ")"}
    s = []

    for bracket in test_iterable:
        if bracket in pairs:
            s.append(bracket)
        elif s and bracket == pairs[s.pop()]:
            continue
        else:
            return False

    return not s
```
