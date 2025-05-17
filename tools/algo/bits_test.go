
package algo
import (
	"fmt"
	"testing"
)

// TestReverseBits verifies the reverseBits function with a table of test cases
func TestReverseBits(t *testing.T) {
    tests := []struct {
        input    uint32
        expected uint32
    }{
        {43261596, 964176192}, // Example case
        {0, 0},                // Zero
        {1, 2147483648},       // Single bit (1 << 31)
        {2147483648, 1},       // Single bit at other end
        {4294967295, 4294967295}, // All bits set
    }
    
    for _, test := range tests {
        result := reverseBits(test.input)
        if result != test.expected {
            panic(fmt.Sprintf("Failed: input %d, expected %d, got %d", 
                  test.input, test.expected, result))
        }
    }
    
    fmt.Println("All reverseBits tests passed")
}