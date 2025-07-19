---
title: A garbage collector in Go from scratch
tags: go

---


a garbage collector, replicating <https://github.com/munificent/mark-sweep> step by step 

```go
package gc

import (
	"fmt"
	"sync"
)

const maxStackSize = 256

type objectType int

const (
	typeInt objectType = iota
	typePair
)

// Object represents a value in our virtual machine
type Object struct {
	typ    objectType
	marked bool
	next   *Object
	// We could use an interface{} here, but for this example we'll keep it simple
	value      int      // for typeInt
	head, tail *Object  // for typePair
}

// VM represents our virtual machine with its own garbage collector
type VM struct {
	mu          sync.Mutex
	stack       [maxStackSize]*Object
	stackSize   int
	firstObject *Object
	numObjects  int
	maxObjects  int
}

// NewVM creates and initializes a new virtual machine
func NewVM() *VM {
	return &VM{
		maxObjects: 8,
	}
}

// Push adds an object to the VM's stack
func (vm *VM) Push(value *Object) error {
	vm.mu.Lock()
	defer vm.mu.Unlock()

	if vm.stackSize >= maxStackSize {
		return fmt.Errorf("stack overflow: cannot push more than %d objects", maxStackSize)
	}
	vm.stack[vm.stackSize] = value
	vm.stackSize++
	return nil
}

// Pop removes and returns the top object from the VM's stack
func (vm *VM) Pop() (*Object, error) {
	vm.mu.Lock()
	defer vm.mu.Unlock()

	if vm.stackSize <= 0 {
		return nil, fmt.Errorf("stack underflow: cannot pop from empty stack")
	}
	vm.stackSize--
	return vm.stack[vm.stackSize], nil
}

// mark recursively marks all reachable objects
func (vm *VM) mark(obj *Object) {
	if obj == nil || obj.marked {
		return
	}

	obj.marked = true

	if obj.typ == typePair {
		vm.mark(obj.head)
		vm.mark(obj.tail)
	}
}

// markAll marks all reachable objects from the stack
func (vm *VM) markAll() {
	for i := 0; i < vm.stackSize; i++ {
		vm.mark(vm.stack[i])
	}
}

// sweep removes unreachable objects
func (vm *VM) sweep() {
	var next **Object = &vm.firstObject

	for *next != nil {
		if !(*next).marked {
			unreached := *next
			*next = unreached.next
			vm.numObjects--
			continue
		}
		(*next).marked = false
		next = &(*next).next
	}
}

// GC performs garbage collection
func (vm *VM) GC() {
	vm.mu.Lock()
	defer vm.mu.Unlock()

	numObjects := vm.numObjects
	vm.markAll()
	vm.sweep()
	vm.maxObjects = vm.numObjects * 2

	fmt.Printf("GC: collected %d objects, %d remaining\n", numObjects-vm.numObjects, vm.numObjects)
}

// newObject creates a new object of the given type
func (vm *VM) newObject(typ objectType) *Object {
	if vm.numObjects >= vm.maxObjects {
		vm.GC()
	}

	obj := &Object{
		typ: typ,
	}

	obj.next = vm.firstObject
	vm.firstObject = obj
	vm.numObjects++

	return obj
}

// PushInt creates and pushes a new integer object
func (vm *VM) PushInt(value int) error {
	obj := vm.newObject(typeInt)
	obj.value = value
	return vm.Push(obj)
}

// PushPair creates and pushes a new pair object
func (vm *VM) PushPair() (*Object, error) {
	tail, err := vm.Pop()
	if err != nil {
		return nil, fmt.Errorf("failed to pop tail: %w", err)
	}

	head, err := vm.Pop()
	if err != nil {
		return nil, fmt.Errorf("failed to pop head: %w", err)
	}

	obj := vm.newObject(typePair)
	obj.head = head
	obj.tail = tail

	if err := vm.Push(obj); err != nil {
		return nil, fmt.Errorf("failed to push pair: %w", err)
	}

	return obj, nil
}

// String implements the Stringer interface for Object
func (o *Object) String() string {
	switch o.typ {
	case typeInt:
		return fmt.Sprintf("%d", o.value)
	case typePair:
		return fmt.Sprintf("(%v, %v)", o.head, o.tail)
	default:
		return "<unknown>"
	}
}

// For testing
type testCase struct {
	name     string
	test     func(*VM) error
	validate func(*VM) error
}

func runTests() error {
	tests := []testCase{
		{
			name: "objects on stack are preserved",
			test: func(vm *VM) error {
				if err := vm.PushInt(1); err != nil {
					return err
				}
				if err := vm.PushInt(2); err != nil {
					return err
				}
				vm.GC()
				return nil
			},
			validate: func(vm *VM) error {
				if vm.numObjects != 2 {
					return fmt.Errorf("expected 2 objects, got %d", vm.numObjects)
				}
				return nil
			},
		},
		{
			name: "unreached objects are collected",
			test: func(vm *VM) error {
				if err := vm.PushInt(1); err != nil {
					return err
				}
				if err := vm.PushInt(2); err != nil {
					return err
				}
				if _, err := vm.Pop(); err != nil {
					return err
				}
				if _, err := vm.Pop(); err != nil {
					return err
				}
				vm.GC()
				return nil
			},
			validate: func(vm *VM) error {
				if vm.numObjects != 0 {
					return fmt.Errorf("expected 0 objects, got %d", vm.numObjects)
				}
				return nil
			},
		},
		{
			name: "handle cycles",
			test: func(vm *VM) error {
				if err := vm.PushInt(1); err != nil {
					return err
				}
				if err := vm.PushInt(2); err != nil {
					return err
				}
				a, err := vm.PushPair()
				if err != nil {
					return err
				}

				if err := vm.PushInt(3); err != nil {
					return err
				}
				if err := vm.PushInt(4); err != nil {
					return err
				}
				b, err := vm.PushPair()
				if err != nil {
					return err
				}

				// Create cycle
				a.tail = b
				b.tail = a

				vm.GC()
				return nil
			},
			validate: func(vm *VM) error {
				if vm.numObjects != 4 {
					return fmt.Errorf("expected 4 objects, got %d", vm.numObjects)
				}
				return nil
			},
		},
	}

	for _, tc := range tests {
		vm := NewVM()
		if err := tc.test(vm); err != nil {
			return fmt.Errorf("%s: %w", tc.name, err)
		}
		if err := tc.validate(vm); err != nil {
			return fmt.Errorf("%s: %w", tc.name, err)
		}
		fmt.Printf("✓ %s\n", tc.name)
	}
	return nil
}

func Example() {
	if err := runTests(); err != nil {
		fmt.Printf("Tests failed: %v\n", err)
		return
	}
}
```