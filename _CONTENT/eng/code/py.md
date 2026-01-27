---
---
<https://docs.python.org/3/library/index.html>


## types 
```
bool int float complex Decimal 

str bytes 

list tuple 
dict set 
 
class enum dataclass

namedtuple
deque 
defaultdict
Counter 

heapq
bisect
sortedcontainers 
```

<https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html>


## flow 
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

## i/o
```py
pathlib.Path 
    parent name stem suffix 

    q = Path('folder') / 'file.txt'  

    p.read_text()  
    p.write_text()

    path.read_bytes() 
    path.write_bytes(b'data') 

mkdir(parents=True, exist_ok=True)
exists() is_dir()
with q.open() as f: f.readline()

for path in Path(dir).rglob("*"):
    // if isdir
    for item in path.iterdir():
        ...

shutil.rmtree(path)

open()
    modes: r w x a b t +

with open(path, "r") as f:
    for line in f:
        yield line

with open(path, "rb") as f:
    while chunk := f.read(size):
        yield chunk

json
    dumps(obj) 
    loads(str)

    dump(obj, f, indent=4) 
    load(f) 

    $ python -m json films.json # validate and print



urllib.parse.urlparse(str) # scheme netloc path params query frag

session = requests.Session()
with threading.Semaphore(8):
    resp = session.get(url, timeout)
    resp.raise_for_status()

response = httpx.get('https://api.example.com/data', params={'key': 'value'}) 
with httpx.Client(timeout=10) as c:
    resp = c.get(url, params, headers)
    resp.raise_for_status()

asyncio
    Lock
    Event
    Condition
    Semaphore
    BoundedSemaphore
    Barrier

    Queue
    PriorityQueue
    LifoQueue

    create_subprocess_exec()
    create_subprocess_shell()

    run()
    sleep()
    wait()
    gather()
    shield()

asyncio.run(main())

async with asyncio.TaskGroup() as tg:
    tg.create_task(..)
```