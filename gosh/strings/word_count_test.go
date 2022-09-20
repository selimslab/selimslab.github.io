package gosh

import "testing"

func TestWordCount(t *testing.T) {
	cases := []struct {
		in   string
		want int
	}{
		{"Hello, world", 2},
	}
	for _, c := range cases {
		got := WordCount(c.in)
		if got != c.want {
			t.Errorf("WordCount(%v) == %v, want %d", c.in, got, c.want)
		}
	}
}
