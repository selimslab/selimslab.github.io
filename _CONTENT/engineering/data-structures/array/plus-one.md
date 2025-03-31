---

---

```py
def plusOne(self, digits: list[int]) -> list[int]:
    n = len(digits)
    
    for i in range(n-1,-1,-1):
        if digits[i] == 9:
            digits[i] = 0 
        else:
            digits[i] += 1 
            break 
    
    if digits[0] == 0:
        return [1] + [0] * n

    return digits   
```