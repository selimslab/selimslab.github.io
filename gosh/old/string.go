package main

import (
    "strconv"
    "fmt"
    "strings"
)

func main() {
    t := strconv.Itoa(345464)
    fmt.Println(t)
}


func WordCount(s string) map[string]int {
	counts :=  map[string]int{}
	for _, token := range strings.Fields(s) {
		counts[token]++
	}
	return counts
}


func buildStr(){
    var str strings.Builder

    for i := 0; i < 1000; i++ {
        str.WriteString("a")
    }

    fmt.Println(str.String())
}