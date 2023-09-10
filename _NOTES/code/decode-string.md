---
tags: str stack


--- 


```python
def decodeString(self, s):
    """
    s = "3[a]2[bc]", return "aaabcbc".
    s = "3[a2[c]]", return "accaccacc".
    s = "2[abc]3[cd]ef", return "abcabccdcdcdef".
    """

    stack = []
    coeff = 0
    current_str = ""

    for c in s:
        if c.isdigit():
            coeff = coeff * 10 + int(c)
        elif c == "[":
            stack.append((current_str, coeff))
            current_str = ""
            coeff = 0
        elif c == "]":
            prev_str, coeff = stack.pop()
            current_str = prevString + num * current_str
        else:
            current_str += c

    return current_str
```
