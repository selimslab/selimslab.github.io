---
tags: ptr stack
---


```python
# with 2 pointers
def reverseOnlyLetters(S: str) -> str:
    n = len(S)
    left = 0
    right = n - 1
    res = list(S)

    while right > 0 and not res[right].isalpha():
        right -= 1

    while left < right:
        if res[left].isalpha():
            res[left], res[right] = res[right], res[left]
            right -= 1
            while right > 0 and not res[right].isalpha():
                right -= 1

        left += 1

    return "".join(res)


#  a simpler way
def reverseOnlyLetters(S: str) -> str:
    stack = [c for c in S if c.isalpha()]
    ans = [stack.pop() if c.isalpha() else c for c in S]

    return "".join(ans)


assert reverseOnlyLetters("ab-cd") == "dc-ba"
assert reverseOnlyLetters("a-bC-dEf-ghIj") == "j-Ih-gfE-dCba"
assert reverseOnlyLetters("Test1ng-Leet=code-Q!") == "Qedo1ct-eeLg=ntse-T!"
```
