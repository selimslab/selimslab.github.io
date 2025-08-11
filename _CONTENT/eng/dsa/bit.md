---
---
## bit 
```c
get:    & 1<<i
set:    | 1<<i
clear:  & ~(1<<i)

masks

-1 << (i+1) // 1111 << 2 = 1100 

(1<<i)-1 // 0100 - 0001 = 0011 
```

```go
// bin(num).count('1') in py 
func countOnes(n int) int {
    count := 0
    for n > 0 {
        count += n & 1
        n >>= 1
    }
    return count
}

func countZeros(n int) int {
    totalBits := bits.Len(uint(n)) 

    if n == 0 {
        return totalBits
    }
    
    return totalBits - countBits(n)
}

/*
Input: 00000010100101000001111010011100
Output: 00111001011110000010100101000000
*/
func reverseBits(num uint32) uint32 {
    res := uint32(0)
    power := uint32(31)
    for num != 0 {
        res += (num & 1) << power
        num = num >> 1
        power -= 1
    }
    return res
}
```