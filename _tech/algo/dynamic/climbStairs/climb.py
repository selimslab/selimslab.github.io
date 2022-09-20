def climb_stairs(n: int) -> int:
    memo = {1: 1, 2: 2}

    def climb(n):
        if n not in memo:
            memo[n] = climb(n - 1) + climb(n - 2)
        return memo.get(n)

    return climb(n)


def climb(n):
    if n<2:
        return n 
    
    return climb(n - 1) + climb(n - 2)

print(climb_stairs(100))


