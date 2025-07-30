#!/usr/bin/env -S uv run --script
import sys
import subprocess
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path


def read_parts(path, seps=None):
    if seps is None:
        seps = set(("# "))
    with open(path, 'r') as f:
        part = []
        for line in f:
            if any(line.strip().startswith(sep) for sep in seps):
                if part:
                    yield "\n".join(part)
                part = []
            part.append(line.strip())

        if part:
            yield "\n".join(part)


def run_tool(part, cmd):
    result = subprocess.run(cmd, input=part, text=True, capture_output=True, shell=True)
    return result.stdout


def main():
    if len(sys.argv) < 2:
        return 
    
    path = Path(sys.argv[1])
    cmd = "/Users/selimozturk/.claude/local/claude -p '/s' "
    parts = list(read_parts(path))
    
    with ThreadPoolExecutor() as executor:
        results = list(executor.map(lambda p: run_tool(p, cmd), parts[:2]))
    
    with open(f"{path.stem}_results.txt", 'w') as f:
        for i, result in enumerate(results, 1):
            f.write(f"Part {i}:\n{result}\n\n")


if __name__ == "__main__":
    main()
