import collections

def characterReplacement(s:str, k:int):
    counter = collections.Counter()
    start = 0
    longest_window = 0 

    current_window_size = lambda: end-start+1

    for end, c in enumerate(s):
        counter[c] += 1
        count_of_most_freq_char_in_window = counter.most_common(1)[0][1]
        count_of_different_chars_in_window = current_window_size() - count_of_most_freq_char_in_window
        has_enough_replacements = count_of_different_chars_in_window <= k
        if not has_enough_replacements: 
            # shrink_the_window
            counter[s[start]] -= 1
            start += 1
            
        longest_window = max(longest_window, current_window_size())
    return longest_window  

s = "ABAB"
k = 2
assert characterReplacement(s,k) == 4 

s = "AABABBA"
k = 1
assert characterReplacement(s,k) == 4 
