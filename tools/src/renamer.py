#!/usr/bin/env -S uv run --script

from pathlib import Path
import sys
from util.txt import alphanumeric_only

def rename(file:Path):
    with open(file, 'r') as f:
        first_line = f.readline()
        title = alphanumeric_only(first_line).lower().split('.')[-1].strip().replace(' ', '-')
        new_path = file.parent / f"{file.stem}-{title}{file.suffix}"
        print(new_path)
    file.rename(new_path)


def visit(dir:Path):
    for file in dir.iterdir():
        if file.name.startswith('images'):
            continue
        if file.is_dir():
            visit(file)
        else:
            rename(file)

def main():
    """Main entry point for command line usage."""
    if len(sys.argv) > 1:
        dir_path = Path(sys.argv[1])
        visit(dir_path)

if __name__ == "__main__":
    main()