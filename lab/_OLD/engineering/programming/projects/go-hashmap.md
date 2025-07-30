---
title: A hash table in Go from scratch
tags: go

---

a hash map implementation in Go, inspired by <https://github.com/jamesroutley/write-a-hash-table>

```go
package hashmap

import (
	"hash/fnv"
)

// Pair represents a key-value pair in the hash map
type Pair struct {
	key   string
	value string
}

// HashMap represents a hash map data structure
type HashMap struct {
	size  int
	count int
	pairs []*Pair
}

// NewHashMap creates and initializes a new hash map
func NewHashMap(size int) *HashMap {
	if size < 1 {
		size = 42 // default size
	}
	return &HashMap{
		size:  size,
		count: 0,
		pairs: make([]*Pair, size),
	}
}

// hash generates a hash value for a string using FNV-1a
func (h *HashMap) hash(s string, attempt int) int {
	fnv := fnv.New32a()
	fnv.Write([]byte(s))
	hash := int(fnv.Sum32())
	return (hash + attempt) % h.size
}

// Set adds or updates a key-value pair in the hash map
func (h *HashMap) Set(key, value string) {
	index := h.hash(key, 0)
	newPair := &Pair{key: key, value: value}

	// Linear probing
	attempt := 0
	for h.pairs[index] != nil {
		if h.pairs[index].key == key {
			h.pairs[index] = newPair
			return
		}
		attempt++
		index = h.hash(key, attempt)
	}

	h.pairs[index] = newPair
	h.count++
}

// Get retrieves a value by key from the hash map
func (h *HashMap) Get(key string) (string, bool) {
	index := h.hash(key, 0)
	attempt := 0

	for h.pairs[index] != nil {
		if h.pairs[index].key == key {
			return h.pairs[index].value, true
		}
		attempt++
		index = h.hash(key, attempt)
		
		// Break if we've searched the entire table
		if attempt >= h.size {
			break
		}
	}
	return "", false
}

// Delete removes a key-value pair from the hash map
func (h *HashMap) Delete(key string) bool {
	index := h.hash(key, 0)
	attempt := 0

	for h.pairs[index] != nil {
		if h.pairs[index].key == key {
			h.pairs[index] = nil
			h.count--
			return true
		}
		attempt++
		index = h.hash(key, attempt)
		
		if attempt >= h.size {
			break
		}
	}
	return false
}

// Len returns the number of items in the hash map
func (h *HashMap) Len() int {
	return h.count
}
```