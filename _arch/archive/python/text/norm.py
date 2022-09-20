def normalize(s: str):
    return unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode("ascii")
