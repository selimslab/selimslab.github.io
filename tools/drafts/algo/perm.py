from collections.abc import Collection
from typing import TypeVar

T = TypeVar("T")


def permute(collection: Collection[T]) -> list[list[T]]:
    """
    Generate all permutations of a collection (list or set).

    Args:
        collection: A collection (list, set, etc.) of elements

    Returns:
        list[list[T]]: A list of all possible permutations
    """
    # Convert to list if it's not already
    arr = list(collection)

    if len(arr) == 0:
        return [[]]
    else:
        result = []
        for i in range(len(arr)):
            # Get current element
            current = arr[i]
            # Get all permutations of remaining elements
            remaining_perms = permute(arr[:i] + arr[i + 1 :])
            # Add current element to each permutation of remaining elements
            for perm in remaining_perms:
                result.append([current] + perm)
        return result
