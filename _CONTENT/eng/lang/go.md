---
---
## Types

```go
// basic types
int/uint 8 16 32 64
floaat 32 64
complex 64 128
bool
string
byte: alias for uint8
rune: alias for int32 (4-byte utf8 unicode code point)

// composite types
[5]int

[]int

map[string]int

type Person struct {
    Name string
}

*ptr

func(a int) string

interface {}

chan int
```



## Data races

<https://www.uber.com/en-CZ/blog/data-race-patterns-in-go/>

```go


import(
    "sync"
    "sync/atomic"
)

func worker(counter *atomic.Int64) {
    counter.Add(1)
}

var mu sync.RWMutex
m := make(map[string]int)
s := make([]int, 0)
go func() {
    mu.Lock()
    m["x"] = 1
    s = append(s, 1)
    mu.Unlock()
}()
```

## Array, slice

```go

var x []string{"a", "b"}

s := make([]int, 5)

s = append(s, 2, 3)

for i, num := range s {
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


## Maps

```go

// Maps
import(
    "fmt"
    "maps"
)

m := make(map[string]int)


for k, v := range m {
}

for k := range m {
}

delete(m, k)

if maps.Equal(m1, m2) {
}

clear(m)

```




## Funcs, methods, interfaces


```go

// funcs
func sum(a int, b int)

func sum(a,b,c int)

func sum(nums ...int)

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


// Pointers
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


## Concurrency
```go

var mu sync.RWMutex
mu.Lock()
sharedData = newValue
mu.Unlock()


var wg sync.WaitGroup
wg.Add(1)
go func() {
    defer wg.Done()
    // work
}()
wg.Wait()

```


## Files

```go
file, err := os.Open("file.txt")
if err != nil {
    return err
}
defer file.Close()
```
