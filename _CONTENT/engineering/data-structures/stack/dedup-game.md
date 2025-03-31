---
tags: str stack
---

```py
from typing import NamedTuple

class CharCount(NamedTuple):
    char: str
    count: int

def dedup_k(s: str, k: int) -> str:
    # Repeatedly dedup adjacent K letters until no longer can.

    stack: list[CharCount] = []  
    for c in s:
        top = stack[-1]
        if stack and top.char == c:
            top.count += 1
            if top.count == k:
                stack.pop()
        else:
            stack.append(CharCount(c,1))

    return "".join(c.char * c.count for c in stack)


assert dedup_k("deeedbbcccbdaa", 3) == "aa"
```

