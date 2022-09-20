from fuzzywuzzy import process, fuzz


def match_by_fuzzy_string_search(
    possible_matches: List[str], string_to_be_searched: str
) -> str:
    scores = dict()
    for candidate in possible_matches:
        n = len(candidate.split())
        n_grams = generate_ngrams(string_to_be_searched, n)
        for n_gram in n_grams:
            possible_match, score = process.extractOne(
                n_gram, possible_matches, scorer=fuzz.ratio
            )
            old_score = scores.get(possible_match, 0)
            if score > old_score:
                scores[possible_match] = score

    if scores:
        most_possible_match = max(scores, key=scores.get)
        most_score = scores.get(most_possible_match)
        if most_score > 80:
            return most_possible_match

    return ""
