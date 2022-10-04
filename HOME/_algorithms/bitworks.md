---
tags: algorithms
---


```c
// Get 
num & 1<<i 

// Set 
num | 1<<i

// Clear 
num & ~(1<<i)

// masks
(1<<i)-1 // 0100 
0100 - 1  //0011

-1 << (i+1) // 1111 
1111 << 2 // 1100 
```

```go
func reverseBits(num uint32) uint32 {
    /*
    Input: 00000010100101000001111010011100
    Output: 00111001011110000010100101000000
    */
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

```py
def readBinaryWatch(self, num: int) -> List[str]:    
    """
    Given a non-negative integer n which represents the number of LEDs that are currently on, 
    return all possible times a binary watch could represent.
    Example:
    Input: n = 1
    Return: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]
    """
    return ['%d:%02d' % (h, m)
            for h in range(12) for m in range(60)
            if (bin(h) + bin(m)).count('1') == num]
```