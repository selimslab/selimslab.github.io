---
tags: 
    - string
---

[[string]]

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