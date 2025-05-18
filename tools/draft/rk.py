BASE = 256  # Number of possible values in a byte
PRIME = 101  # A prime number for hash calculation


def calculate_hash(string: str, length: int) -> int:
    hash_value = 0
    for index in range(length):
        hash_value = (BASE * hash_value + ord(string[index])) % PRIME
    return hash_value


def calculate_power_value(pattern_length: int) -> int:
    power = 1
    for _ in range(pattern_length - 1):
        power = (power * BASE) % PRIME
    return power


def update_hash(prev_hash: int, power: int, old_char: str, new_char: str) -> int:
    new_hash = (BASE * (prev_hash - ord(old_char) * power) + ord(new_char)) % PRIME
    if new_hash < 0:
        new_hash += PRIME
    return new_hash


def verify_match(text: str, pattern: str, start_pos: int) -> bool:
    for index in range(len(pattern)):
        if text[start_pos + index] != pattern[index]:
            return False
    return True


def rabin_karp(text: str, pattern: str) -> list[int]:
    if not pattern or not text or len(pattern) > len(text):
        return []

    text_length = len(text)
    pattern_length = len(pattern)
    match_positions: list[int] = []

    power = calculate_power_value(pattern_length)
    pattern_hash = calculate_hash(pattern, pattern_length)
    text_window_hash = calculate_hash(text, pattern_length)

    for window_start in range(text_length - pattern_length + 1):
        if pattern_hash == text_window_hash and verify_match(
            text, pattern, window_start
        ):
            match_positions.append(window_start)

        if window_start < text_length - pattern_length:
            text_window_hash = update_hash(
                text_window_hash,
                power,
                text[window_start],
                text[window_start + pattern_length],
            )

    return match_positions
