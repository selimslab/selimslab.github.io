---
tags: algorithms
---

```python
def quick_sort(data):
    # base case
    if len(data) < 2:
        return data
    # recursion
    else:
        less = list()
        greater = list()
        equal = list()
        pivot = data[int(len(data)/2)]
        for i in data:
            if i < pivot:
                less.append(i)
            elif i == pivot:
                equal.append(i)
            else:
                greater.append(i)

        return quick_sort(less) + equal + quick_sort(greater)


if __name__ == "__main__":
    print(quick_sort([9, 7, 5, 4, 6, 8, 12, 1, 26, 1, 1]))
```

```python
def selection_sort(data):
    sorted_list = list()
    for i in range(len(data)):
        smallest_index = data.index(min(data))
        sorted_list.append(data.pop(smallest_index))
    return sorted_list

if __name__ == "__main__":
    print(selection_sort([9, 7, 5, 4, 6, 8, 12, 1, 26, 1, 1]))
```

```go
function findUnsortedSubarray(nums){
  return nums.slice()
    .sort((a, b) => a - b)
    .reduce((acc, curr, idx) => acc + (curr === nums[idx] ? ' ' : 'x'), '')
    .trim().length;
}

let ans = findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15])
console.log(ans)
// answer is 5 
// it's enough to sort [6, 4, 8, 10, 9] to make all sorted 
```

```python
def findUnsortedSubarray(nums) -> int:
    is_same = [a == b for a, b in zip(nums, sorted(nums))]
    if all(is_same):
        return 0
    else:
        first_index = is_same.index(False)
        last_index = len(nums) - is_same[::-1].index(False)
        return last_index - first_index


"""
[2, 6, 4, 8, 10, 9, 15]
[t,f,... f,t]
0,1, .. 5,6
false starts at index 1, ends at 5 
"""

assert findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]) == 5
```

```python
from heapq import heappush, heappop


def heapsort(iterable):
    h = []
    for val in iterable:
        heappush(h, val)
    # or just h = heapify(iterable)
    return [heappop(h) for i in range(len(h))]


assert heapsort([1, 3, 5, 7, 9, 2, 4, 6, 8, 0]) == [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```


