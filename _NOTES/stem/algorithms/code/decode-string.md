---
tags: str  stack
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
    ans = ""

    for c in s:
        if c == "[":
            stack.append(ans)
            stack.append(coeff)
            ans = ""
            coeff = 0
        elif c == "]":
            num = stack.pop()
            prevString = stack.pop()
            ans = prevString + num * ans
        elif c.isdigit():
            coeff = coeff * 10 + int(c)
        else:
            ans += c

    return ans
```
