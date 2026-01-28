---
---
## files 
```go
import (
    "path/filepath"
    "os"
    "bufio"
)
path := filepath.Join(os.TempDir(), "data")
data, err := os.ReadFile(path)


f, err := os.Create(path)
n, err := f.Write([]byte)
n, err := f.WriteString("a\n")

r := bufio.NewReader(f)
buf, err := r.Peek(5)

w := bufio.NewWriter(f)
n, err := w.WriteString("buffered\n")
```

## json
```go
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
```


## net 
```go
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
```

## time 
```go
import "time"

start := time.Now()
elapsed := time.Since(start)
time.Sleep(100 * time.Millisecond)

case <-time.After(10 * time.Second): 
```

## conc. 
```go
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

## misc 
```go
os.Setenv("FOO", "1")
os.Getenv("FOO")

import (
    "log"
    "log/slog"
)
log.Println()
```