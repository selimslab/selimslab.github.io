# A pangram is a sentence using every letter of a given alphabet at least once.
def is_pangram(s: string):
    return not set("abcdefghijklmnopqrstuvwxyz") - set(s.lower())
