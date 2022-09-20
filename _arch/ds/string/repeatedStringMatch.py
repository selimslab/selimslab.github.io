def repeatedStringMatch(A: str, B: str) -> int:
    """
    minimum number of times you should repeat string a,
    so that string b is a substring of it.
    """
    if set(B).difference(set(A)):
        return -1 
    
    rep = ""
    count = 0
    while len(rep) < 10000:
        rep += A      
        count += 1
        if B in rep:
            return count 
    
    return -1 
    
a = "abcd"
b = "cdabcdab"
assert repeatedStringMatch(a,b) == 3 