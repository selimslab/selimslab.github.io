package gosh

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

// WordCount counts words in a string
func WordCount(s string) int {
	return len(strings.Fields(s))
}

func bufferCount() {
	var chars, words, lines int
	r := bufio.NewReader(os.Stdin)
	fmt.Printf("hi")
	for {
		switch s, ok := r.ReadString('\n'); true {
		case ok != nil:
			fmt.Printf("%d %d %d\n", chars, words, lines)
			return
		default:
			chars += len(s)
			words += len(strings.Fields(s))
			lines++
		}
	}
}
