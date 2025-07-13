import pytest
from rk import (
    rabin_karp,
    calculate_hash,
    calculate_power_value,
    update_hash,
    verify_match,
)


def test_empty_inputs():
    assert rabin_karp("", "") == []
    assert rabin_karp("text", "") == []
    assert rabin_karp("", "pattern") == []


def test_pattern_longer_than_text():
    assert rabin_karp("abc", "abcdef") == []


def test_single_match():
    assert rabin_karp("hello world", "world") == [6]


def test_multiple_matches():
    assert rabin_karp("abababa", "aba") == [0, 2, 4]


def test_no_match():
    assert rabin_karp("hello world", "python") == []


def test_overlapping_matches():
    assert rabin_karp("aaa", "aa") == [0, 1]


def test_calculate_hash():
    assert calculate_hash("abc", 256, 101, 3) == (97 * 256**2 + 98 * 256 + 99) % 101


def test_calculate_power_value():
    assert calculate_power_value(256, 101, 3) == 256**2 % 101


def test_update_hash():
    old_hash = calculate_hash("abc", 256, 101, 3)
    new_hash = update_hash(old_hash, 256, 101, 256**2 % 101, "a", "d")
    expected = calculate_hash("bcd", 256, 101, 3)
    assert new_hash == expected


def test_verify_match():
    assert verify_match("hello", "ell", 1) is True
    assert verify_match("hello", "elo", 1) is False


# Table-based tests for rabin_karp function
test_cases = [
    # (text, pattern, expected_matches)
    # Basic cases
    ("hello world", "world", [6]),
    ("abababa", "aba", [0, 2, 4]),
    ("aaa", "aa", [0, 1]),
    ("hello world", "python", []),
    # Empty inputs
    ("", "", []),
    ("text", "", []),
    ("", "pattern", []),
    # Pattern longer than text
    ("abc", "abcdef", []),
    # Multiple matches
    ("abcabcabc", "abc", [0, 3, 6]),
    ("mississippi", "issi", [1, 4]),
    ("aaaaa", "aaa", [0, 1, 2]),
    # Single character matches
    ("abcdefg", "g", [6]),
    ("abcdefg", "a", [0]),
    # No matches
    ("abcdefg", "abcdefgh", []),
    # Multiple occurrences
    ("abcdefgabcdefg", "defg", [3, 10]),
    # Special characters
    ("hello!@#$%", "!@#", [5]),
    # Unicode characters
    ("こんにちは世界", "世界", [4]),
    # Repeated characters
    ("xxxxxxxx", "xxx", [0, 1, 2, 3, 4, 5]),
    # Pattern same as text
    ("exact", "exact", [0]),
    # Overlapping patterns
    ("aaaaa", "aa", [0, 1, 2, 3]),
]


@pytest.mark.parametrize("text,pattern,expected", test_cases)
def test_rabin_karp(text, pattern, expected):
    assert rabin_karp(text, pattern) == expected


# Performance test with large inputs
def test_large_input():
    text = "a" * 10000 + "b"
    pattern = "a" * 100 + "b"
    assert rabin_karp(text, pattern) == [9900]
