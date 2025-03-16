---
tags: str mid
---


```python
def generate_ngrams(s, n):
    s = s.lower()

    pattern_non_alphanumeric = r"[^a-zA-Z0-9\s]"
    s = re.sub(pattern_non_alphanumeric, " ", s)

    tokens = [token for token in s.split(" ") if token != ""]
    
    n_grams = [" ".join(tokens[i : i + n]) for i in range(len(tokens))]

    return n_grams
```