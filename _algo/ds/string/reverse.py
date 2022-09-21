def reverse_string(s):
    if len(s) == 1:
        return s
    return s[-1] + rev(s[:-1])
