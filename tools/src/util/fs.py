def write_file(filename, content):
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)


def read_file(filename):
    with open(filename, "r") as f:
        return f.read()


def clean_filename(filename):
    """Remove invalid characters from filename and limit length."""
    invalid_chars = '<>:"/\\|?*#_'
    for char in invalid_chars:
        filename = filename.replace(char, " ")
    filename = filename.strip(". ")
    return filename[:100] if len(filename) > 100 else filename
