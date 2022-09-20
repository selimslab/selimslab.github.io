
import itertools
import random

def stream(last_seen):

    for i in itertools.count(last_seen):
        r = random.randint(1,6)
        if r >5:
            raise Exception("lost conn")
        yield i 

def consumer(last_seen = 0):
        g = stream(0)
        while True:
            try:
                last_seen = next(g)
                yield last_seen
            except Exception:
                g = stream(last_seen) 
                continue 


for i in consumer():
    print(i)