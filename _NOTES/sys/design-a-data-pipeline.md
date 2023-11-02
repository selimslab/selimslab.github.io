---
tags: sys 
---

## Goals  

1. Ingest data from different sources
2. Run a graph of SQL transforms to prepare it for modeling 
3. Persist clean results in a target store 
4. Make long-running operations async 
5. Make it easy to follow the progress, logs, and errors 
6. Multiple flows can run at the same time 

```py

class SourceTypes(Enum):
    DB = 1
    File = 2


class ConnectionInfo:
    ... 


class DataStore:
    source_type: SourceTypes
    connection_info: ConnectionInfo



class DBConnection(ConnectionInfo):
    host: str
    port: int
    user: str
    password: str
    db_name: str 


class FileConnection(ConnectionInfo):
    path: str


class DBStore(DataStore):
    source_type: SourceTypes.DB
    connection_info: DBConnection


class FileStore(DataStore):
    source_type: SourceTypes.File
    connection_info: FileConnection

class FlowStates(Enum):
    READY = 1
    RUNNING = 2
    CANCELLED = 3
    FAILED = 4
    COMPLETED = 5


class Progress:
    percent: int  
    started: datetime
    updated: datetime


class Flow:
    sources: list[DataStore]
    target: DataStore
    state: FlowStates
    progress: Progress
    logs: list[str]
    errors: list[str]
```

