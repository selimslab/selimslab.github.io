---
layout: post
title: Sort
---


```
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

```
def selection_sort(data):
    sorted_list = list()
    for i in range(len(data)):
        smallest_index = data.index(min(data))
        sorted_list.append(data.pop(smallest_index))
    return sorted_list

if __name__ == "__main__":
    print(selection_sort([9, 7, 5, 4, 6, 8, 12, 1, 26, 1, 1]))
```
