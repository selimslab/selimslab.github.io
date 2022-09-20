import re


def tr_chars_to_eng(tr_str):
    pairs = [("ş", "s"), ("ğ", "g"), ("ç", "c"), ("ı", "i"), ("ö", "o"), ("ü", "u")]
    for pair in pairs:
        tr_str = tr_str.replace(pair[0], pair[1])

    return tr_str


def create_eng_char_name_map(d, eng_map):
    for k, v in d.iteritems():
        if isinstance(v, dict):
            create_eng_char_name_map(d, eng_map)
        else:
            eng_map[k] = tr_chars_to_eng(k)
            eng_map[v] = tr_chars_to_eng(v)
    return eng_map


def generate_ngrams(s, n):
    # Convert to lowercases
    s = s.lower()

    # Replace all none alphanumeric characters with spaces
    s = re.sub(r"[^a-zA-Z0-9\s]", " ", s)

    # Break sentence in the token, remove empty tokens
    tokens = [token for token in s.split(" ") if token != ""]

    # generate n grams
    n_grams = list()

    for i in range(len(tokens)):
        n_gram = " ".join(tokens[i : i + n])
        n_grams.append(n_gram)

    return n_grams
