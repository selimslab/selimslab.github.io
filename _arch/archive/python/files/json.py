def read_line_by_line(file_path):
    content = None
    try:
        with open(file_path, "r") as f:
            print("reading file line by line ", file_path)
            content = f.read().splitlines()
    except IOError as e:
        print(e)
    return content


def write_line_by_line(file_path, data):
    try:
        with open(file_path, "w") as f:
            print("writing line by line ", file_path)
            for line in data:
                f.write(str(line) + "\n")
    except IOError as e:
        print(e.message)


def json_to_excel(json_path, excel_path):
    df = pd.read_json(json_path)
    df.to_excel(excel_path, index=False)
