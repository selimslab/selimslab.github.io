def solution(xs):
    """
    return the maximum product of a non-empty subset 
    """
    # explore the input
    count_negative = 0
    has_zero = 0
    count_positive = 0
    for x in xs:
        if x < 0:
            count_negative += 1
        elif x == 0:
            has_zero = True
        else:
            count_positive += 1

    # 0 cases 
    only_zeros = has_zero and count_negative == 0 and count_positive == 0

    # eg. [-3,0,0]
    zeros_with_a_single_negative = (
        has_zero and count_negative == 1 and count_positive == 0
    )  

    if only_zeros or zeros_with_a_single_negative:
        return str(0)

    # multiply all but zeros
    prod = 1
    for x in xs:
        if x != 0:
            prod *= x

    # if number of negatives is odd and the input has either multiple negatives or a positive
    # then exclude the max negative
    # eg. given [-5,-3,-2, 0, 2 ] exclude -2
    # [-1] do nothing
    # [-1,0,3] exclude -1
    has_odd_number_of_negatives = count_negative % 2 != 0
    has_multiple_negatives = count_negative > 1
    has_positive = count_positive != 0

    if has_odd_number_of_negatives and (has_multiple_negatives or has_positive):
        # exclude the max negative
        max_negative = float("-inf")
        for x in xs:
            if x < 0:
                max_negative = max(max_negative, x)

        # use // so it works with both python 2 and 3
        prod //= max_negative

    return str(prod)


def powerset(itr):
    powerset = [[]]
    for x in itr:
        powerset += [subset + [x] for subset in powerset]

    return powerset


test_cases = [
    ([0], 0),
    ([0, 0, 0], 0),
    ([-1, 0], 0),
    ([-1, 0, 0], 0),
    ([-2, -3, -1, 0], 6),
    ([-2, -3, -1, 0, 0], 6),
    ([-1], -1),
    ([-2], -2),
    ([4], 4),
    ([0, 5], 5),
    ([-1, 4], 4),
    ([-1, 0, 4], 4),
    ([-2, 0, 3], 3),
    ([-2, -3, -1, 0], 6)
]

"""
    [-1, 0, 4],
    [-2, 4],
    
    
    [],
    [0],
    [0, 1, 2, 3],
    
    [-2, -3, -1, 0, 1, 2, 3],
"""

# cases += powerset([-2,-3,-4, 0 ,1, 2 ])



def max_product(A):
    """Calculate maximal product of elements of A"""
    product = 1
    greatest_negative = float("-inf") # greatest negative multiplicand so far

    for x in A:
        product = max(product, product*x, key=abs)
        if x <= -1:
            greatest_negative = max(x, greatest_negative)

    return max(product, product // greatest_negative)

