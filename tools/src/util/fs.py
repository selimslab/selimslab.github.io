import re

def write_file(filename, content):
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)


def read_file(filename):
    with open(filename, "r") as f:
        return f.read()


def clean_filename(filename):
    """Keep only alphanumeric characters and spaces, limit length."""
    # Keep only a-z, A-Z, 0-9, and spaces using regex
    cleaned = re.sub(r'[^a-zA-Z0-9 ]', '', filename)
    return cleaned[:100] if len(cleaned) > 100 else cleaned


def ensure_clean_directory(directory_path):
    """Create directory and clean all existing files/subdirectories."""
    from pathlib import Path
    import shutil
    
    directory = Path(directory_path)
    directory.mkdir(parents=True, exist_ok=True)

    # Clean existing files
    if directory.exists():
        for item in directory.glob("*"):
            if item.is_file():
                item.unlink()
            elif item.is_dir():
                shutil.rmtree(item)

    return directory
