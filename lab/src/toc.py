from pathlib import Path
from ebooklib import epub
from collections import defaultdict
from util.cli import cli
import json
from util.txt import alphanumeric_only

def visit_toc(toc, func):
    for item in toc:
        if isinstance(item, tuple):
            title, children = item
            func(title, children)
        else:
            func(item)

def get_title(item):
    title = ""
    # Handle different types of TOC items more robustly
    if hasattr(item, 'title'):
        title = item.title
    elif hasattr(item, 'label'):
        # Some items might use 'label' instead of 'title'
        title = item.label
    elif hasattr(item, 'get_name'):
        title = item.get_name()
    
    if not title or title.lower() == "preface":
        return ""
    return alphanumeric_only(title.strip())

def build_toc_dict(toc):
    toc_dict = defaultdict(dict)
    
    def process_item(*args):
        if len(args) == 2:
            # This is a section with subitems: (title, children)
            title, children = args
            section_title = get_title(title)
            toc_dict[section_title] = build_toc_dict(children)
        else:
            # This is a simple item
            item = args[0]
            title = get_title(item)
            toc_dict[title] = {}
    
    visit_toc(toc, process_item)
    return { k:v for k,v in toc_dict.items() if k }


def get_toc_dict(file_path: Path) -> dict:
    """
    Get the table of contents from an EPUB file.
    just return a nested dict, all keys and vals are titles.

    """
    book = epub.read_epub(file_path)
    if not book:
        raise ValueError("Failed to read EPUB file")
    return build_toc_dict(book.toc)


def get_all_tocs_in_dir(user_input:str):

    dir_path = Path(user_input)
    tocs = {}
    for file_path in dir_path.rglob("*.epub"):
        tocs[file_path.stem] = get_toc_dict(file_path)
    
    with open("tocs.json", "w") as f:
        json.dump(tocs, f, indent=4)


if __name__ == "__main__":
    cli(get_all_tocs_in_dir, "dir path: ")
