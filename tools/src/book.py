from pathlib import Path
from dataclasses import dataclass, field

@dataclass
class Section:
    title: str
    content: str
    
@dataclass
class Chapter:
    title: str
    sections: list[Section]
    
@dataclass
class Book:
    title: str
    file_path: Path
    toc: str
    chapters: list[Chapter] = field(default_factory=list)
    output_dir: Path