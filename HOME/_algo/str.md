---
layout: post
title: String
---

```python
def reverse_string(s):
    if len(s) == 1:
        return s
    return s[-1] + rev(s[:-1])
```

```python
def generate_ngrams(s, n):
    # Convert to lowercases
    s = s.lower()

    # Replace all none alphanumeric characters with spaces
    s = re.sub(r"[^a-zA-Z0-9\s]", " ", s)

    # Break sentence in the token, remove empty tokens
    tokens = [token for token in s.split(" ") if token != ""]

    n_grams = []

    for i in range(len(tokens)):
        n_gram = " ".join(tokens[i : i + n])
        n_grams.append(n_gram)

    return n_grams
```

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


```python
import heapq
from heapq import heappush, heappop, heapify

def longestDiverseString(a: int, b: int, c: int) -> str:
    
    ans = 0
    
    # get 2 from max, 1 from min 
    
    minh = [a,b,c]
    maxh = [a,b,c]

    heapify(minh)
    heapq._heapify_max(maxh)
    
    
    maxnum = heappop(maxh)
    minnum = heappop(minh)


    while maxnum or minnum:
        if maxnum:
            print("maxh",maxh)

            if maxnum > 1:
                heappush(maxh, maxnum-2)
                ans += 2
            

            else:
                ans += 1
            
            if maxh:
                maxnum = heappop(maxh)
                
        if minnum:
            print("minh",minh)
            if minnum > 0:
                ans += 1
                heappush(minh, minnum-1)

                minnum = heappop(minh)

    print(ans)
    return ans 


longestDiverseString(7,1,1)
```

```python
def string_compression(string):
    counter = 0
    compressed = ""
    previous_letter = string[0]

    for letter in string:
        if letter != previous_letter:
            compressed = compressed + previous_letter + str(counter)
            counter = 0
        counter += 1
        previous_letter = letter

    compressed = compressed + previous_letter + str(counter)

    return compressed


assert string_compression("aaaabbcccccaaabb") == "a4b2c5a3b2"
```

```python
def longest_common_prefix(words) -> "str":
    if not words:
        return ""

    shortest_word = min(words, key=len)

    for i, letter in enumerate(shortest_word):
        for s in words:
            if s[i] != letter:
                return shortest_word[:i]

    return shortest_word


assert longest_common_prefix(["flower", "flow", "flight"]) == "fl"
```


```python
def repeatedStringMatch(A: str, B: str) -> int:
    """
    minimum number of times you should repeat string a,
    so that string b is a substring of it.
    """
    if set(B).difference(set(A)):
        return -1 
    
    rep = ""
    count = 0
    while len(rep) < 10000:
        rep += A      
        count += 1
        if B in rep:
            return count 
    
    return -1 
    
a = "abcd"
b = "cdabcdab"
assert repeatedStringMatch(a,b) == 3 
```

## Norvig's spell corrector 

<https://norvig.com/spell-correct.html>