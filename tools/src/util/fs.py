from pathlib import Path
import shutil


def write_file(filename, content):
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)


def read_file(filename):
    with open(filename, "r") as f:
        return f.read()


def clean_directory(dir_path: Path):

    if not dir_path.exists():
        return
    
    for item in dir_path.glob("*"):
        if item.is_file():
            item.unlink()
        elif item.is_dir():
            shutil.rmtree(item)

