def solution(s):
    # Your code here
    braille_ascii_table = {
        " ": "000000",
        "a": "100000",
        "b": "110000",
        "c": "100100",
        "d": "100110",
        "e": "100010",
        "f": "110100",
        "g": "110110",
        "h": "110010",
        "i": "010100",
        "j": "010110",
        "k": "101000",
        "l": "111000",
        "m": "101100",
        "n": "101110",
        "o": "101010",
        "p": "111100",
        "q": "111110",
        "r": "111010",
        "s": "011100",
        "t": "011110",
        "u": "101001",
        "v": "111001",
        "w": "010111",
        "x": "101101",
        "y": "101111",
        "z": "101011",
    }
    
    UPPERCASE_PREFIX = "000001"
    
    braille_codes = []
    for c in s:
        try:
            if c.isupper():
                braille_code = braille_ascii_table[c.lower()]
                braille_codes.append(UPPERCASE_PREFIX)
            else: 
                braille_code = braille_ascii_table[c]
            braille_codes.append(braille_code)
        except KeyError as e:
            print("unsupported character", c)
            raise e 

    return "".join(braille_codes) 
    
    

    

assert solution("Braille3") == "000001110000111010100000010100111000111000100010"