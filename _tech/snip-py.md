---
layout: post
title: Snippets, Python 
---



## Regex

```
import re


def remove_digits(word):
    return re.sub("\d+", "", word)


def find_n_digits_only(n, word):
    return re.findall(r"\d" + "{" + str(n) + "}", word)


def remove_non_alpha_numeric_chars(word):
    return re.sub("[^\w]", "", word)


def find_digits(word):
    return re.findall(r"\d+", word)


def find_float(word):
    return re.findall(r"\d+\.\d+", word)


def generate_ngrams(s, n):
    # Convert to lowercases
    s = s.lower()

    # Replace all none alphanumeric characters with spaces
    s = re.sub(r"[^a-zA-Z0-9\s]", " ", s)

    # Break sentence in the token, remove empty tokens
    tokens = [token for token in s.split(" ") if token != ""]

    # generate n grams
    n_grams = list()

    for i in range(len(tokens)):
        n_gram = " ".join(tokens[i : i + n])
        n_grams.append(n_gram)

    return n_grams

```

## Time 

```
from datetime import datetime, timedelta

TODAY = datetime.now().date().isoformat()


def get_date_of_x_days_ago(x: int):
    return (datetime.now().date() - timedelta(days=x)).isoformat()


def str_to_date(s: str):
    return datetime.strptime(s, "%Y-%m-%d").date()

```


## Collections

```

from collections import Counter, defaultdict, ChainMap
from typing import Iterable, List, Callable


def tree():
    return defaultdict(tree)


def merge_list_of_dicts(ld: List[dict]) -> dict:
    return dict(ChainMap(*ld))


def get_most_frequent_key(d: dict):
    if d:
        return max(d, key=d.get)


def filter_dict(d: dict, filter_func: Callable):
    return {k: v for k, v in d.items() if filter_func(k, v)}


def remove_empty_list_values_of_a_dict(d: dict) -> dict:
    for k, v in d.items():
        if isinstance(v, list):
            d[k] = [i for i in v if i]
    return d


def remove_null_dict_values(d) -> dict:
    return {k: v for k, v in d.items() if v is not None}


def filter_keys(d: dict, allowed_keys: set) -> dict:
    return {k: v for k, v in d.items() if k in allowed_keys}


def allow_string_keys_only(d: dict) -> dict:
    return {k: v for k, v in d.items() if isinstance(k, str) and v is not None}


def merge_nested_dict(d: dict):
    """
    d = {
        a: {
            colors: ["white"]
        },
        b: {
            colors: ["blue"]
        },
    }
    merged = {
    colors : ["white", "blue"]
    }
    """
    merged = defaultdict(set)  # uses set to avoid duplicates

    for key, nested_dict in d.items():
        for k, v in nested_dict.items():  # use d.iteritems() in python 2
            merged[k].update(v)

    return merged


def convert_dict_set_values_to_list(d: dict) -> dict:
    return {k: list(v) for k, v in d.items()}


def count_fields(docs: List[dict], target_key: str):
    return sum(1 if target_key in doc else 0 for doc in docs)


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


```