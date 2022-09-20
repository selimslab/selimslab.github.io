def basic_fibonacci(n):
    a, b = 0, 1
    for i in range(1, n):
        a, b = b, a + b
    return b


memo = {}


def smart_fibonacci(n):
    if n < 2:
        return n
    if n not in memo.keys():
        memo[n] = fib(n - 1) + fib(n - 2)
    return memo.get(n)
