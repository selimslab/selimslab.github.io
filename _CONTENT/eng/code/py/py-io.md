---
---
## files 
```py
from pathlib import Path 

p.parent name stem suffix 

p = Path('folder') / 'file.txt'  
p.read_text()  
p.write_text()
p.read_bytes() 
p.write_bytes(b'data') 

mkdir(parents=True, exist_ok=True)
exists() is_dir()
with p.open() as f: f.readline()

for path in Path(dir).rglob("*"):
    for item in path.iterdir():
        ..

shutil.rmtree(path)

open()
    modes: r w x a b t +

with open(path, "r") as f:
    for line in f:
        yield line

with open(path, "rb") as f:
    while chunk := f.read(size):
        yield chunk


import json

json.dumps(obj) 
loads(str)

dump(obj, f, indent=4) 
load(f) 

$ python -m json films.json # validate and print
```

## http
```py

urllib.parse.urlparse(str) # scheme netloc path params query frag

session = requests.Session()
with threading.Semaphore(8):
    resp = session.get(url, timeout)
    resp.raise_for_status()


response = httpx.get('https://api.example.com/data', params={'key': 'value'}) 
with httpx.Client(timeout=10) as c:
    resp = c.get(url, params, headers)
    resp.raise_for_status()
```


## asyncio
```py
run()
sleep()
wait()
gather()
shield()

asyncio.run(main())

async with asyncio.TaskGroup() as tg:
    tg.create_task(..)

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
```