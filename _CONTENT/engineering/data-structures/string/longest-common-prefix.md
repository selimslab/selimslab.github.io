---

---


```python
def longest_common_prefix(words) -> str:
    if not words:
        return ""

    shortest_word = min(words, key=len)

    for i, letter in enumerate(shortest_word):
        for w in words:
            if w[i] != letter:
                return shortest_word[:i]

    return shortest_word


assert longest_common_prefix(["flower", "flow", "flight"]) == "fl"
```

