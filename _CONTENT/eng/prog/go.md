---
---
## types 
```go 
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr
byte // alias for uint8
rune // alias for int32, a Unicode code point

float32 float64
complex64 complex128
const Pi = 3.14

var s []int
s := make([]int, 0, 3) // size, cap 

map[K]V
m := make(map[string]int, 5) // cap 

type name struct{}
type name interface{}

type day int 
const(
    mon day = iota
    tue
    wed 
)
```


## proc 
```go
func name(params ...type) (type, error){ return }

if else 
switch case default 

for 
range 


s = append(s, 2)
copy(dst, src)

// append works on nil slices.
s = append(s, 0)

// We can add more than one element at a time.
s = append(s, 2, 3, 4)

names := []string{"Alice", "Bob", "Vera"}
slices.Contains(names, "Bob") // true 
slices.Delete(names, 1, 2) // "Alice", "Vera"
n, found := slices.BinarySearch(names, "Vera") 

nums := []int{0, 1, 1, 2, 3, 5, 8}
slices.Index(nums, 2) // 3
slices.Clone(nums)
slices.Compact(nums) // [0 1 2 3 5 8]

slices.Concat(s1, s2)
slices.Compare(a, b) // -1, 0, 1 



m2 := map[string]int{
    "one": 1,
    "two": 2,
}
delete(m, key)
clear(m)

m2 := maps.Clone(m1)
maps.Copy(m1, m2) // dst, src

maps.Keys(m1)
maps.Values(m2)



import (
    s "strings"
) 

s.Contains("test", "es") // es in test 
s.HasPrefix
s.Index("test", "e")
s.Join([]string{"a", "b"}, "-") // "-".join(['a', 'b'])
s.Split("a-b-c-d-e", "-")
s.ToLower
```


## i/o
```go
// http


// files 



// json


// time 
start := time.Now()
elapsed := time.Since(start)
time.Sleep(100 * time.Millisecond)

case <-time.After(10 * time.Second): 



// conc. 
go
chan 
select 

var wg sync.WaitGroup
wg.Go(func() {}) // or Add + Done
wg.Wait()

var mu sync.Mutex
defer mu.Unlock()
mu.Lock()

var once sync.Once
once.Do(func)

sync/atomic

ctx 
    <-ctx.Done()

```


<https://nghiant3223.github.io/2025/06/03/memory_allocation_in_go.html>

<https://itnext.io/how-to-implement-the-outbox-pattern-in-go-and-postgres-e9bc2699cbe2>

<https://grafana.com/blog/how-i-write-http-services-in-go-after-13-years/>