import os


def traverse_directory(root_dir):
    for dir_name, subdir_list, file_list in os.walk(root_dir):
        yield dir_name, subdir_list, file_list


def read_file(file_path):
    content = None
    try:
        with open(file_path, "r") as f:
            print("reading file ", file_path)
            content = f.read()
    except IOError as e:
        print(e)
    return content


def write_file(filename, data, append=False):
    command_string = "w"
    if append:
        command_string = "a"
    try:
        with open(filename, command_string) as f:
            print("writing to ", filename)
            f.write(data)
    except IOError as e:
        print(e.message)
