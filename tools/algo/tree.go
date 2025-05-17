package algo

import (
	"fmt"
)

// Tree represents a binary tree with integer values
type Tree struct {
	Left  *Tree
	Value int
	Right *Tree
}

// Walk walks the tree t sending all values
// from the tree to the channel ch.
func Walk(t *Tree, ch chan int) {
	walkTree(t, ch)
	close(ch)
}

func walkTree(t *Tree, ch chan int) {
	if t == nil {
		return
	}
	walkTree(t.Left, ch)
	ch <- t.Value
	walkTree(t.Right, ch)
}

// Same determines whether the trees
// t1 and t2 contain the same values.
func Same(t1, t2 *Tree) bool {
	ch1, ch2 := make(chan int), make(chan int)
	go Walk(t1, ch1)
	go Walk(t2, ch2)
	
	for v1 := range ch1 {
		v2, ok := <-ch2
		if !ok || v1 != v2 {
			return false
		}
	}
	
	// Check if ch2 still has values
	_, ok := <-ch2
	return !ok
}

// New creates a new tree with values 1 to 10 in a balanced structure
func New(k int) *Tree {
	var t *Tree
	for _, v := range []int{k, k * 2, k / 2, k + 1, k - 1} {
		t = insert(t, v)
	}
	return t
}

// insert adds a value to the tree while maintaining BST properties
func insert(t *Tree, v int) *Tree {
	if t == nil {
		return &Tree{nil, v, nil}
	}
	if v < t.Value {
		t.Left = insert(t.Left, v)
	} else {
		t.Right = insert(t.Right, v)
	}
	return t
}

func main() {
	ch := make(chan int)
	go Walk(New(1), ch)
	for i := range ch {
		fmt.Println(i)
	}
	fmt.Println("Should return true:", Same(New(1), New(1)))
	fmt.Println("Should return false:", Same(New(1), New(2)))
}