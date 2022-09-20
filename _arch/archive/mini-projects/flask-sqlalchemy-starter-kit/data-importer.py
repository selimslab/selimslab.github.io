import csv
from typing import Iterator
import requests
import itertools
from tqdm import tqdm


def row_generator(csv_path: str) -> Iterator[dict]:
    """
    Read a csv file row by row
    :param csv_path:
    :return: dicts of csv rows
    """
    try:
        with open(csv_path, "r") as csv_file:
            reader = csv.DictReader(csv_file)
            for row in reader:
                yield row
    except FileNotFoundError as e:
        print(e)
    except IOError as e:
        print(e)


def post_csv_rows_the_api(api_endpoint: str, data_generator: Iterator[dict]):
    print("importing..")
    for row in tqdm(data_generator):
        r = requests.post(api_endpoint, json=row)
        if r.status_code != 200:
            print(r.status_code, r.reason)
    print("IMPORT SUCCESSFUL!")


def test_post_csv_rows_the_api():
    """ Create 3 example rows on DB """
    test_generator = itertools.islice(ROW_GENERATOR, 3)
    for row in test_generator:
        print(row)
    post_csv_rows_the_api(API_ENDPOINT, test_generator)


if __name__ == "__main__":
    API_ENDPOINT = "http://127.0.0.1:5000/tasks/"
    DATA_PATH = "task_data.csv"
    ROW_GENERATOR = row_generator(DATA_PATH)
    # test_post_csv_rows_the_api()
    post_csv_rows_the_api(API_ENDPOINT, ROW_GENERATOR)