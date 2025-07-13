from perm import permute
import pytest


@pytest.mark.parametrize(
    "input_collection, expected_result",
    [
        # Empty collections
        ([], [[]]),
        (set(), [[]]),
        # Single element
        ([1], [[1]]),
        ({1}, [[1]]),
        # Two elements
        ([1, 2], [[1, 2], [2, 1]]),
        ({1, 2}, [[1, 2], [2, 1]]),
        # Three elements
        ([1, 2, 3], [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]),
        ({1, 2, 3}, [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]),
    ],
)
def test_permute(input_collection, expected_result):
    result = permute(input_collection)

    # Check length
    assert len(result) == len(expected_result)

    # Check all permutations are present
    for perm in expected_result:
        assert perm in result


if __name__ == "__main__":
    pytest.main(["-v", __file__])
