---
tags: str
---


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