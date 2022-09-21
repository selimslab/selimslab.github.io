---
layout: post
title: Stacks, Queues, Heaps
---


## Stack 

```
def dedup(S: str) -> str:
    # Repeatedly dedup adjacent letter until no longer can.
    stack = [""]
    for s in S:
        if s == stack[-1]:
            stack.pop()
        else:
            stack.append(s)

    return "".join(stack)


assert dedup("abbaca") == "ca"


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



```
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

```
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

```
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

```
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

```
def dailyTemperatures(T):
    """
    how many days you would have to wait until a warmer temperature ? 
    """

    ans = [0] * len(T)
    stack = []
    for i, t in enumerate(T):
        while stack and T[stack[-1]] < t:
            cur = stack.pop()
            ans[cur] = i - cur
        stack.append(i) 

    return ans


t = [73, 74, 75, 71, 69, 72, 76, 73]
assert dailyTemperatures(t) ==  [1, 1, 4, 2, 1, 1, 0, 0]
```

## Queue 

```
/*
Given a positive integer n, 
find the least number of perfect square numbers which sum to n.
(for example, 1, 4, 9, 16, ...)

Example 1:

Input: n = 12
Output: 3 
Explanation: 12 = 4 + 4 + 4.


Example 2:

Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.
*/

func numSquares(n int) int {
    var perfect_squares []int
    for i:= 1; i*i<=n; i++{
        if i*i == n{
            return 1
        }
        perfect_squares = append(perfect_squares, i*i)
    }
    
    ans := 0 
    queue := []int{n}
    
    for len(queue) != 0  {
        /*
        ans 1, queue is [12] 
        ans 2, the paths are 1,4,9 -> queue becomes [11 8 3], 
        following the paths 1,4,9, the new level becomes [10 7 2 7 4 2]
        ans = 3, it returns at 4, the shortest path to 0 turns out to be 12 -> 8 -> 4 -> 0 
        */
        ans += 1
        var next_level []int
        for _, num := range(queue){
            for _, perf := range(perfect_squares){
                if num == perf{
                    return ans
                }
                if num<perf{
                    break
                }
                next_level = append(next_level, num-perf)
            } 
            
        }
        queue = next_level 
    }
    return ans 
}
```


## Heap  

```
import heapq


class KthLargest:
    """
    find the kth largest element in a stream.
    in the sorted order, not the kth distinct element.
    """

    def __init__(self, k: int, nums: List[int]):
        self.pool = nums
        self.k = k
        heapq.heapify(self.pool)
        while len(self.pool) > k:
            heapq.heappop(self.pool)

    def add(self, val: int) -> int:
        if len(self.pool) < self.k:
            heapq.heappush(self.pool, val)
        elif val > self.pool[0]:
            heapq.heapreplace(self.pool, val)
        return self.pool[0]


KthLargest(3, [4, 5, 8, 2])
kthLargest.add(3)  # returns 4
kthLargest.add(5)  # returns 5
kthLargest.add(10)  # returns 5
kthLargest.add(9)  # returns 8
kthLargest.add(4)  # returns 8
```