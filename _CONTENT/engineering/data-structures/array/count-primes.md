---

---

From 2 to sqrt(n), if any number divides n, n can't be a prime 


```py
def count_primes(self, n: int) -> int:
    """
    Mark non-primes, 
    2s, 3s, 5s
    """
    primes = [True] * n
    
    for i in range(2, int(sqrt(n))+1):
        if primes[i] is False: 
            continue 
        for j in range(i*i, n, i):
            primes[j] = False
            
    return sum(1 if primes[i] else 0 for i in range(2,n))
```