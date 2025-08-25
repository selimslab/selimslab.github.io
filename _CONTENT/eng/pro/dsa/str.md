---
---
## rabin-karp
rolling hash
linear str search

Rabin fingerprint
`H(str) = A^(n-1) + ... + A^0`
for ascii, A=128 possible chars
n is the string length

`H("abc") = 128^2 * code(a) + 128 * code(b) + code(c)`

## LPS
longest prefix suffix

ABAB
lcs=2
since AB - AB

## KMP
search patterrn in txt

txt ptr always move ahead

if mismatch happens at x,
move pattern ptr to lcs[x-1]
