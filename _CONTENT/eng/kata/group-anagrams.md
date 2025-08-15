---

---

turn every word into a list of numbers, in a fixed size 26 list, for each letter. then compare lists

```py
"""
Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
"""
def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
    ans = collections.defaultdict(list)
    for s in strs:
        count = [0]*26
        for c in s:
            count[ord(c)-ord("a")] +=1

        ans[tuple(count)].append(s)

    return ans.values()
```

```go
import(
	"fmt"
)

func anag(strs []string) [][]string {
	groups := make(map[string][]string)

	for _, s := range strs {
			count := make([26]int)
			for _, c := range s {
				count[int(c-"a")] += 1
			}
			key := fmt.Sprintf("%s", count)
			groups[key] = append(groups[key], s)
	}

	result := make([][]string, 0, len(groups))
	for _, group := range groups {
		result = append(result, group)
	}

	return result
}
```
