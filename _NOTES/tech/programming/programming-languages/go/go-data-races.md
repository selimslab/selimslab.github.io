---
title: Go Data Race Patterns and Prevention
---

<https://www.uber.com/en-CZ/blog/data-race-patterns-in-go/>

## Core Patterns & Solutions

1. **Read-Write Conflicts**
```go
// Bad
func worker(counter *int) {
    *counter++  // Race condition
}

// Good
func worker(counter *atomic.Int64) {
    counter.Add(1)  // Atomic operation
}
```


2. **Map Access**
```go
// Bad
m := make(map[string]int)
go func() { m["x"] = 1 }()
go func() { _ = m["x"] }()

// Good
var mu sync.RWMutex
m := make(map[string]int)
go func() {
    mu.Lock()
    m["x"] = 1
    mu.Unlock()
}()
```

3. **Slice Access**
```go
// Bad
s := make([]int, 0)
go func() { s = append(s, 1) }()

// Good
var mu sync.Mutex
s := make([]int, 0)
go func() {
    mu.Lock()
    s = append(s, 1) 
    mu.Unlock()
}()
```

## Key Prevention Strategies:

1. Use sync/atomic for simple counters
2. sync.Mutex for complex data structures
3. channels for communication
4. sync.RWMutex when reads > writes
5. Use -race flag during testing

## Detection Tools:
- Go race detector (-race flag)
- Static analysis tools (golangci-lint)
- Code reviews focusing on concurrent access

## Best Practices:
- Prefer message passing over shared memory
- Keep critical sections small
- Document synchronization requirements
- Use sync.Once for one-time initialization
- Consider using worker pools and fan-out/fan-in patterns

## Time Complexity Impact:
- atomic: O(1)
- mutex: O(1) average, can have contention
- channels: O(1) for buffered, blocking for unbuffered