def generate_parenthesis(n):
    ans = []

    def backtrack(current_string="", left=0, right=0):
        """
        """
        if len(current_string) == 2 * n:
            ans.append(current_string)
            return
        if left < n:
            # We can start an opening bracket if we still have one (of n) left to place.
            backtrack(current_string + "(", left + 1, right)
        if right < left:
            # And we can start a closing bracket if it would not exceed the number of opening brackets.
            backtrack(current_string + ")", left, right + 1)

    backtrack()
    return ans


def test_par():
    n = 3
    ans = ["((()))", "(()())", "(())()", "()(())", "()()()"]
    result = generate_parenthesis(n)
    assert set(result) == set(ans)
