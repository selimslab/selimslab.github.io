---

---

```python
def check_brackets(expression):
    stack = []
    brackets = {'(': ')', '{': '}', '[': ']'}

    for char in expression:
        if char in brackets.keys():  # Opening bracket
            stack.append(char)
        elif char in brackets.values():  # Closing bracket
            if not stack or brackets[stack.pop()] != char:
                return False

    return len(stack) == 0
```

