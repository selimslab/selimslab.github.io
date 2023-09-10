---

tags: dp


---


```go
import "fmt"

type key struct {
    x,y int 
}

func dist(word1 string, word2 string, table map[key]int, i int, j int ) int {
    if j == 0 {
        return i
    }
    if i == 0 {
        return j
    }
    
    if val, ok := table[key{i,j}]; ok{
        return val 
    }
        
    if word1[i-1] == word2[j-1] {
        return dist(word1,word2,table, i-1, j-1)
    } 
    
    ins := dist(word1,word2,table, i-1, j ) + 1
    del := dist(word1,word2,table, i, j-1 ) + 1
    rep := dist(word1,word2,table, i-1, j-1 ) + 1

    ans := min(del, ins ,rep)   
    table[key{i,j}] = ans
    return ans 
}

func minDistance(word1 string, word2 string) int {
    i, j := len(word1), len(word2)
    table := map[key]int{}
    return dist(word1,word2,table, i, j )
}
```