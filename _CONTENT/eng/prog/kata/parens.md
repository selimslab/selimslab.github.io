---
---
```py
def longestValidParentheses(self, s: str) -> int:
    def scan(string, open_char, close_char):
        maxlen = opens = closes = 0
        for c in string:
            if c == open_char:
                opens += 1
            else:
                closes += 1

            if opens == closes:
                maxlen = max(maxlen, 2 * opens)
            elif closes > opens:
                opens = closes = 0
        return maxlen

    # Forward: ( opens, ) closes
    # Backward: ) opens, ( closes
    return max(scan(s, "(", ")"), scan(reversed(s), ")", "("))

assert longestValidParentheses(")()())") == 4
assert longestValidParentheses("(()") == 2
```
