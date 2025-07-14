from pathlib import Path
from dataclasses import dataclass, field

@dataclass
class Node:
    title: str
    content: list[str] = field(default_factory=list)
    children: list["Node"] = field(default_factory=list)
    
@dataclass
class Book:
    title: str
    file_path: Path
    toc: dict
    nodes: list[Node] = field(default_factory=list)
