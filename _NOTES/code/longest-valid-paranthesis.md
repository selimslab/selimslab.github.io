---
tags: ptr str stack

---


```python
def longestValidParentheses(self, s: str) -> int:
    maxlen = 0

    l = r = 0

    for c in s:
        if c == "(":
            l += 1
        else:
            r += 1

        if l == r:
            maxlen = max(maxlen, 2 * l)
        elif r > l:
            l = r = 0

    l = r = 0

    for c in reversed(s):
        if c == ")":
            l += 1
        else:
            r += 1

        if l == r:
            maxlen = max(maxlen, 2 * l)
        elif r > l:
            l = r = 0

    return maxlen


assert longestValidParentheses("()()())") == 4
assert longestValidParentheses("(()") == 2
```


```java
/*
Input: ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()"
*/

// stack, linear time and space 
public int longestValidParentheses(String s) {
    int maxans = 0;
    Stack<Integer> stack = new Stack<>();
    stack.push(-1);
    for (int i = 0; i < s.length(); i++) {
        if (s.charAt(i) == '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.empty()) {
                stack.push(i);
            } else {
                maxans = Math.max(maxans, i - stack.peek());
            }
        }
    }
    return maxans;
}
```