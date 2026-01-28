---
---
```go
func name(params ...type) (type, error){ return }

if else 
switch case default 
for range 
```

## slices 
```go
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
```

## maps 
```go
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
```

## strings 
```go
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
```

## testing 

```go
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