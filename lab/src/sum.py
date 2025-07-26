#!/usr/bin/env -S uv run --script

from pathlib import Path
import sys

def summarize(file:Path):
    with open(file, 'r') as f:
        text = f.read()
    print(text)

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