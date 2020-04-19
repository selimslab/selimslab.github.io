import copy
import cProfile

def run():
    x = list(range(100000))  # allocate a big list
    y = copy.deepcopy(x)
    del x
    return y

if __name__ == "__main__":
    run()