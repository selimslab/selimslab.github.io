package gosh

import (
	"sort"
)

type byLength []string

func (s byLength) Len() int {
	return len(s)
}
func (s byLength) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}
func (s byLength) Less(i, j int) bool {
	return len(s[i]) < len(s[j])
}

// ByLength sorts a slice of strings by length
func ByLength(s []string) []string {
	sort.Sort(byLength(s))
	return s
}
