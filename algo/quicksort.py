def quick_sort(data):
    # base case
    if len(data) < 2:
        return data
    else:
        pivot = data[int(len(data) / 2)]

        less = list()
        greater = list()
        equal = list()
        for i in data:
            if i < pivot:
                less.append(i)
            elif i == pivot:
                equal.append(i)
            else:
                greater.append(i)

        return quick_sort(less) + equal + quick_sort(greater)


def selection_sort(data):
    sorted_list = list()
    for i in range(len(data)):
        smallest_index = data.index(min(data))
        sorted_list.append(data.pop(smallest_index))
    return sorted_list


def test_sorts():
    input = [9, 7, 5, 4, 6, 8, 12, 1, 26, 1, 1]
    assert sorted(input) == quick_sort(input)
    assert sorted(input) == selection_sort(input)
