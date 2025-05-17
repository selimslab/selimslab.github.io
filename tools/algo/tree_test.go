package algo

import (
	"testing"
)

func TestWalk(t *testing.T) {
	ch := make(chan int)
	go Walk(New(1), ch)
	
	// Collect values from channel
	var values []int
	for v := range ch {
		values = append(values, v)
	}
	
	// Check if we got the expected number of values
	// Our tree implementation has 5 nodes
	if len(values) != 5 {
		t.Errorf("Expected 5 values, got %d", len(values))
	}
	
	// Check if values are sorted (in-order traversal produces sorted output)
	for i := 1; i < len(values); i++ {
		if values[i-1] > values[i] {
			t.Errorf("Values not sorted: %v", values)
			break
		}
	}
}

func TestSame(t *testing.T) {
	// Test identical trees
	if !Same(New(1), New(1)) {
		t.Error("Same(New(1), New(1)) = false, want true")
	}
	
	// Test different trees
	if Same(New(1), New(2)) {
		t.Error("Same(New(1), New(2)) = true, want false")
	}
} 