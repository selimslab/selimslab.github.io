l = [1, 2, 2, 3, 3, 3, 4, 4, 5]
assert list(dict.fromkeys(l)) == [1, 2, 3, 4, 5]

# Starting with Python 3.7,
# the built-in dictionary is guaranteed to maintain the insertion order
# use OrderedDict for older pythons
