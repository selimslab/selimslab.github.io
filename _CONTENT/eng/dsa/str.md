---
---
## rabin-karp 

Search a small string in a big string, in linear time, using a rolling hash 

big = "nature does not hurry" small = "ur"

O(b.s) becomes O(b+s)

Rabin fingerprint `H(str) = A^(n-1) + ... + A^0`

Where A is the alphabet size, for ascii, A=128 possible chars

n is the string length 

`H("ur") = 128^1 * code(u) + 128^0 * code(r)`


## LPS
longest prefix suffix 
ABAB lcs=2 since AB - AB

## KMP 
search patterrn in txt, 
two ptrs: txt ptr and pattern ptr 
txt ptr always move ahead
if mismatch happens at x, move pattern ptr to lcs[x-1]
