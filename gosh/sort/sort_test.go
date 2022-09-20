package gosh

import (
	"reflect"
	"testing"
)

func TestByLength(t *testing.T) {
	cases := []struct {
		in, want []string
	}{
		{[]string{"peach", "banana", "kiwi"}, []string{"kiwi", "peach", "banana"}},
	}
	for _, c := range cases {
		got := ByLength(c.in)

		if !reflect.DeepEqual(got, c.want) {
			t.Errorf("SortByLength(%q) == %q, want %q", c.in, got, c.want)
		}
	}
}
