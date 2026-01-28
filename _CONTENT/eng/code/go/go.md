---
---
<https://pkg.go.dev/std>

<https://gobyexample.com/>

## types 
```go 
bool

string
z   
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

