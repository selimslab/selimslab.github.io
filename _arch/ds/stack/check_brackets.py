def check_brackets(iterable):
    if len(iterable) % 2 != 0:
        return False
    # also validate all are brackets

    pairs = {"{": "}", "[": "]", "(": ")"}

    s = []
    for bracket in iterable:
        if bracket in pairs:
            s.append(bracket)
        elif s and bracket == pairs[s.pop()]:
            continue
        else:
            return False

    return not s
