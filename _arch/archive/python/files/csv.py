import csv


def read_csv(file_path):
    with open(file_path, "r") as csvFile:
        # or reader = csv.DictReader(csvFile)
        reader = csv.reader(csvFile)

        for row in reader:
            yield row


def write_csv(file_path):
    with open(file_path, "w") as writeFile:
        writer = csv.writer(writeFile)
        writer.writerows(lines)
