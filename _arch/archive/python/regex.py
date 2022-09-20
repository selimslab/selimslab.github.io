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
