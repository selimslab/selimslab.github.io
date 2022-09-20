
from collections import namedtuple 
from typing import List 

TestCase = namedtuple("TestCase", ["args","expected"])

def test(test_func, cases:List[TestCase]):
    total = len(cases)
    success = 0 
    for case in cases:
        res = test_func(*case.args)
        try:
            assert case.expected == res
            success += 1
        except AssertionError as e:
            print(case, "expected", case.expected, "got", res)
            print()
    if success == total:
        print("all pass")
    else:
        print(success, "ok", total-success, "fails")
