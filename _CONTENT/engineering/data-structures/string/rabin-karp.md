---
---

Search a small string in a big string

In linear time, using a rolling hash 

big = "nature does not hurry"

small = "ur"

O(big.small) becomes O(big+small)

Rabin fingerprint `H(str) = A^(n-1) + ... + A^0`

Where A is the alphabet size and n is the string length 

`H("ur") = 128^1 * code(u) + 128^0 * code(r)`

For ASCII, A=128 possible chars







