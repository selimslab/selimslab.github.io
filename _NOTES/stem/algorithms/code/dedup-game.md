---
tags: str stack
---

```py
def dedup_k(s: str, k: int) -> str:
    # Repeatedly dedup adjacent K letters until no longer can.

    stack = []  #  keep (char, count) tuples
    for c in s:
        if stack and stack[-1][0] == c:
            stack[-1][1] += 1
            if stack[-1][1] == k:
                stack.pop()
        else:
            stack.append([c, 1])

    return "".join(c * count for c, count in stack)


assert dedup_k("deeedbbcccbdaa", 3) == "aa"
```

