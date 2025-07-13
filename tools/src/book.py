from ebooklib import epub
from pathlib import Path
import html2text
from util.txt import alphanumeric_only
from dataclasses import dataclass
from toc import get_toc

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
    chapters: list[Chapter]
    output_dir: Path