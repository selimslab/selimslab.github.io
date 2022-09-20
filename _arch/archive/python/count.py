from collections import Counter, OrderedDict
from typing import Iterable


def sorted_counter(it: Iterable):
    """ get a sorted counter of an iterable """
    return OrderedDict(Counter(it).most_common())


def test_sorted_counter():
    res = sorted_counter([3, 3, 5, 5, 7, 7, 7])
    for i in res:
        print(i)


def sort_from_long_to_short(it: Iterable) -> list:
    return sorted(list(it), key=len, reverse=True)


def get_most_common_item(itr: Iterable):
    return Counter(itr).most_common(1)[0][0]


def test_get_most_common_item():
    assert get_most_common_item([(2, 3), (2, 3), 4, 5, "a"]) == (2, 3)


def get_majority_if_exists(itr):
    """
    [a,a,b] -> [(a,2), (b,1)]
    """
    commons = Counter(itr).most_common(2)
    if not commons:
        return
    if len(commons) == 1:
        return commons[0][0]
    if len(commons) == 2 and commons[0][1] > commons[1][1]:
        return commons[0][0]
