---
---

```go

var x []string{"a", "b"}

s := make([]int, 5)

s[0] = 1

s = append(s, 2, 3)

for i, num := range s {
    fmt.Println(i, num)
}

c := make([]int, len(s))

c = copy(c,s)

twoD := make([][]int, 5)


for i := 0; i<len(twoD); i++ {
    innerLen := i+1
    twoD[i] = make([]int, innerLen)
    ... 
}
```

```go

import(
    "fmt"
    "maps"
)

m := make(map[string]int)

m["k1"] = 6

m["k2"] = 7

for k, v := range m {
    fmt.Println(k,v)
}

for k := range m {
    ...
}

delete(m, "k1")

m2 := make(map[string][int])

m2["k2"] = 7

if maps.Equal(m, m2) {
    fmt.Println("m == m2")
}

clear(m)

```


```go

func sum(a int, b int){
    return a + b
}

func sum(a,b,c int){
    return a + b + c
}

func sum(nums ...int){
    total := 0 
    for _, num := range nums {
        total += num
    }
    return total
}

func point() (int, int) {
    return 3,5
} 

// Closure
func counter() func() int {
    i := 0 
    return func() int {
        i++
        return i
    }
}

c := counter()

c() // 1
c() // 2
c() // 3


```

```go

i, j := 3, 5 

p := &i // point to i 
fmt.Println(*p) // 3 


type Point struct{
    x int
    y int
}


p := Point{1,2}
pp := &p


type Rect struct{
    p1, p2 Point
}

func (r *Rect) area() int {
    return (r.p1.x - r.p2.x) * (r.p1.y - r.p2.y)
}

type ClosedShape interface {
    area()
    perimeter()
}

type Status int

const (
    Ready = ioata
    InProgress
    Finished
    Failed
)

```