def string_sliding_windows(s: str):
    # ("a b c", ["a", "a b", "a b c", "b", "b c", "c"])
    tokens = s.split()
    windows = []
    for i in range(len(tokens)):
        for j in range(i + 1, len(tokens) + 1):
            windows.append(" ".join(tokens[i:j]))
    return windows


def string_to_extending_windows(s: str, end: int = None) -> list:
    # ("a b c", ["a", "a b", "a b c"])
    tokens = s.split()
    if not end:
        end = len(tokens)
    return [" ".join(tokens[:i]) for i in range(1, end + 1)]
