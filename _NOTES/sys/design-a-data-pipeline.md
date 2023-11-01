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

from dataclasses import dataclass
from typing import List
from enum import Enum


class SourceTypes(Enum):
    DB = 1
    File = 2

@dataclass
class ConnectionInfo:
    ... 

@dataclass
class DataStore:
    source_type: SourceTypes
    connection_info: ConnectionInfo


@dataclass
class DBConnection(ConnectionInfo):
    host: str
    port: int
    user: str
    password: str
    db_name: str 

@dataclass
class FileConnection(ConnectionInfo):
    path: str

@dataclass
class DBStore(DataStore):
    source_type: SourceTypes.DB
    connection_info: DBConnection

@dataclass
class FileStore(DataStore):
    source_type: SourceTypes.File
    connection_info: FileConnection

class FlowStates(Enum):
    READY = 1
    RUNNING = 2
    CANCELLED = 3
    FAILED = 4
    COMPLETED = 5

@dataclass
class Progress:
    percent: int  
    started: datetime
    updated: datetime

@dataclass
class Flow:
    sources: List[DataStore]
    target: DataStore
    state: FlowStates
    progress: Progress
    logs: List[str]
    errors: List[str]
```

