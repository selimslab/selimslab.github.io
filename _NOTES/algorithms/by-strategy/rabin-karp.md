---
tags: algo 
---

Sometimes we need to search for a small string in a big string, 

b = "nature does not hurry"

s = "ur"

Is s in b?

Yes, in two places 

Using a naive string search is O(sb) time, where s and b are the lengths of small and big strings 

Rabin-Karp optimizes this by applying a rolling hash function and comparing substrings with matching hashes 

It takes O(b+s) time to compute hashes, 

number of comparisons depends on the number of matches

Worst case O(bs), mostly O(b+s) 

---

Rabin fingerprint is a rolling hash function, 

H(str) = A^(n-1) + ... + A^0

Where A is the alphabet size and n is the string length 

For ASCII, A=128 possible chars

H(ur) =  128^1 * code(u) + 128^0 * code(r)  






