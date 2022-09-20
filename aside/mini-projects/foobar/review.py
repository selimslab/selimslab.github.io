def solution(start, length):

    def xor_1_to_n_inclusive(n):
        """
        xor of a range from 1 to n inclusive
        goes like 1, x+1, 0, x
        and repeats 
        """
        mod = n%4
        if mod == 0:
            return n
        elif mod == 1:
            return 1
        elif mod == 2:
            return n+1
        return 0

    def xor_range_mod(start,end):
        """
        x^x = 0 
        
        so it is possible to find the xor of a sub-range 
        
        xor(start..end) = xor(1..end) ^ xor(1..start-1)
        """
        all_range = xor_1_to_n_inclusive(end)
        before = xor_1_to_n_inclusive(start-1)
        xor_of_the_range = all_range^before
        return xor_of_the_range 

    checksum = 0 
    workers_to_note = length

    while workers_to_note:
        line_end = start + workers_to_note - 1 
        xor_of_line = xor_range_mod(start,line_end)
        checksum ^= xor_of_line
        start += length 
        workers_to_note-=1
    
    return checksum

    
def xor_range_iterative(start,end):
    checksum = 0
    for i in range(start,end+1):
        checksum ^= i
    return checksum


def test():
    from tester import TestCase, test

    tests = [
        TestCase(args=(17,4),expected=14),
        TestCase((0,3),2),
        TestCase((52,4),122),
        TestCase((1,1),1),
        TestCase((2,2),5)
    ]

    test(solution, tests)

test()
