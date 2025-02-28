---

---

```py

class AuthType(Enum):
    API_KEY = "api_key"
    OAUTH = "oauth"
    BASIC = "basic"

class AuthInput:
    ...

class ConnectionInput:
    auth_type: AuthType
    auth_input: AuthInput

class DataSource:
    connection_input: ConnectionInput 

    def connect(self):
        ...

    def authenticate(self):
        ...

    def read(self):
        ...

    def write(self):
        ... 


class FileConnectionInput(ConnectionInput):
    path: str
    permissions: FilePermissions

class FileSource(DataSource):
    ...

class DatabaseConnectionInput(ConnectionInput):
    name: str
    ... 

class DatabaseSource(DataSource):
    connection_input: DatabaseConnectionInput 

class ApiConnectionInput(ConnectionInput):
    url: str
    ... 

class ApiSource(DataSource):
    connection_input: ApiConnectionInput

class TaskType(Enum):
    EXTRACT = "extract"
    TRANSFORM = "transform"
    LOAD = "load"

class TaskInput:
    source: DataSource
    target: DataSource

class TaskResult:
    ...

class TaskState(Enum):
    READY = "ready"
    RUNNING = "running"
    CANCELLED = "cancelled"
    FAILED = "failed"
    COMPLETED = "completed"

class Task:
    task_type: TaskType
    task_input: TaskInput
    task_result: TaskResult
    task_state: TaskState

class FlowInput:
    tasks: list[Task]

class FlowResult:
    ...

class FlowState(Enum, TaskState):
    ...

class Flow:
    flow_input: FlowInput
    state: FlowState
    result: FlowResult

```

