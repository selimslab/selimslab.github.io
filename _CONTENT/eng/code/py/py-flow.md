---
---
```py
def *args **keywords lambda 
for in 
if elif else break continue 
match case _

len hash repr isinstance 

range iter next enumerate zip 

sorted reversed 

any all map

min max sum round divmod pow // % 

bin hex & | ^ << >> ~

str 
    str.encode bytes.decode 
    ord(a) chr(97) 

    find index startswith
    replace 
    count 

    lower upper 
    strip
    split join

    isalpha isdigit isalnum

    f'{name}'

 
seq: list tuple range 
    len count index 
    append extend insert 
    pop remove 
    reverse copy 
    sort 
    del s[i:j:k] 
    s[i:j:k] = t 
    s *= n  
    s += n 


dict
    len keys values items 
    d[k] = v  setdefault(key, default) 
    get() pop(key, default) 
    del d[k] 
    clear copy update 

set
    | & - ^ <=  
    union intersection difference symmetric_difference
    issubset
    isdisjoint 
    copy 
    update 
    add remove discard pop clear 


itertools 

functools 
    cache
    wraps 


from contextlib import contextmanager
@contextmanager
def resource():
    r = acquire()
    try:
        yield r
    finally:
        release 


threading 
    Lock
    RLock
    Condition wait() notify()
    Semaphore
    Event() set() clear() wait()
    b = Barrier(3) # block until all 3 made their b.wait() calls 
    t = Timer(5.0, f) t.start() # calls f in 5 sec

queue
    Queue
    PriorityQueue

from multiprocessing import Pool
with Pool(5) as p:
    p.map(f, [1, 2, 3])

from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
executor = ThreadPoolExecutor(max_workers=8)
executor.submit(f, data)

subprocess.run("exit 1", shell=True, check=True)
```
