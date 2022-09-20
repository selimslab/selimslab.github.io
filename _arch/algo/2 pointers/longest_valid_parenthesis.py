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
