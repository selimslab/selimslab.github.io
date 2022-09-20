def read_line_by_line(file_path):
    content = None
    try:
        with open(file_path, "r") as f:
            content = f.read().splitlines()
    except IOError as e:
        print(e)
    return content
