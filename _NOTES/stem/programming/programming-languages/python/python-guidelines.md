## Use types 
Python has strong and dynamic typing with a rich type system. 

You can express your data model using enums, dataclasses, type aliases, type hints, and standard types like list, set, tuple, dict, deque, etc. 

Data model encapsulates the domain knowledge and functions operate on typed data. 

This model is closer to functional side on the OOP-functional spectrum. It works well when you process data in new ways, as in many data science/data engineering cases. 

Check out itertools and functools in stdlib if you like to go deeper

[The Python Standard Library](https://docs.python.org/3/library/index.html)

## Examples 

GPT-generated, edited

```py

# Basic Types
x: int = 10
name: str = "Alice"
is_active: bool = True

# Containers with Type Hints
numbers: list[int] = [1, 2, 3]
unique_numbers: set[int] = {1, 2, 3}
point: tuple[float, float] = (3.5, 4.2)
user_info: dict[str, str] = {"name": "Alice", "email": "alice@example.com"}

# Functions with Type Annotations
def add(a: int, b: int) -> int:
    return a + b

def greet(name: str | None = None) -> str:
    return f"Hello, {name}" if name else "Hello, Guest"

def parse_data(data: str | int) -> str:
    return str(data)

# Custom Types and Type Aliases
Users = list[dict[str, str]]
user_list: Users = [{"name": "Alice", "email": "alice@example.com"}]

Coordinates = tuple[float, float]
def get_location() -> Coordinates:
    return 40.7128, -74.0060
```


```py
from typing import Final

PI: Final[float] = 3.14159
MAX_CONNECTIONS: Final[int] = 100
```

```py
from typing import TypeVar, Callable, Union

# Generics
T = TypeVar('T')
def first_element(lst: list[T]) -> T:
    return lst[0]

# Callable Types
def process_data(user: User, action: Callable[[User], UserData]) -> UserData:
    return action(user)
```

```py
from enum import Enum

class Weekday(Enum):
    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3

    def is_weekend(self):
        return self in (Weekday.SATURDAY, Weekday.SUNDAY)

# Auto-Value Enum
class Status(Enum):
    NEW = auto()
    IN_PROGRESS = auto()
    COMPLETED = auto()

class UserRole(Enum):
    ADMIN = "admin"
    EDITOR = "editor"
    VIEWER = "viewer"

# Usage Examples
role = UserRole.ADMIN
role_name = role.name  # "ADMIN"
role_value = role.value  # "admin"
```

```py
from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int
    email: str
    status: Status
    friends: list[str]
    metadata: dict[str, str]
```

Use context managers to properly close file and db connections 
```py
with open('file.txt', 'r') as f:
    data = f.read()
```

