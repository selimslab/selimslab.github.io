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


## flow 
```go
func name(params ...type) (type, error){ return }

if else 
switch case default 
for range 


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

slices.Sort(s) 
ok := slices.IsSorted(s)



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




// parsing 
val, err := strconv.Atoi("135")
ParseInt()
ParseFloat()




func TestFunc(t *testing.T) {
    var tests = []struct {
        a, b int
        want int
    }{
        {0, 1, 0},
    }
}

func BenchmarkFunc(b *testing.B) {
    for b.Loop() {
        f()
    }
}


```


## i/o
```go
import (
    "path/filepath"
    "os"
    "bufio"
)
path := filepath.Join(os.TempDir(), "data")
data, err := os.ReadFile(path)


f, err := os.Create(path)
bytes := []byte{115, 111, 109, 101, 10}
n, err := f.Write(bytes)
n2, err := f.WriteString("a\n")

r := bufio.NewReader(f)
buf, err := r4.Peek(5)
w := bufio.NewWriter(f)
n4, err := w.WriteString("buffered\n")




import (
    "encoding/json"
)

type Resp struct {
    Page   int      `json:"page"`
    Fruits []string `json:"fruits"`
}
str := `{"page": 1, "fruits": ["apple", "peach"]}`
res := Resp{}
json.Unmarshal([]byte(str), &res)

bytes := []byte{}
var obj map[string]interface{}
json.Unmarshal(bytes, &obj)



import "time"

start := time.Now()
elapsed := time.Since(start)
time.Sleep(100 * time.Millisecond)

case <-time.After(10 * time.Second): 




import "net/url"
u, err := url.Parse(s)

// http
import "net/http"

resp, err := http.Get("https://gobyexample.com")
defer resp.Body.Close()

scanner := bufio.NewScanner(resp.Body)


func hello(w http.ResponseWriter, req *http.Request) {}
http.HandleFunc("/hello", hello)
http.ListenAndServe(":8090", nil)


os.Setenv("FOO", "1")
os.Getenv("FOO")


	
import (
    "log"
    "log/slog"
)
log.Println("standard logger")

jsonHandler := slog.NewJSONHandler(os.Stderr, nil)
logger := slog.New(jsonHandler)
logger.Info("hi", "key", "val") // msg, kv pairs ..

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


<-ctx.Done()

```