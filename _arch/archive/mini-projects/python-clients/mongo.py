from pymongo import UpdateOne, InsertOne, UpdateMany, ReplaceOne
from pymongo.errors import BulkWriteError
from tqdm import tqdm
import logging
import constants as keys
from contextlib import contextmanager


class MongoSync:
    def __init__(self, collection, write_interval=None):
        if write_interval is None:
            self.write_interval = 4096
        else:
            self.write_interval = write_interval

        self.ops = list()
        self.collection = collection

    def bulk_exec(self):
        if self.ops:
            try:
                self.collection.bulk_write(self.ops, ordered=False)
                logging.info(f"bulk write successful! written {len(self.ops)} items")
            except BulkWriteError as e:
                logging.error(e)
            finally:
                # clear ops to prevent cascading failure
                self.ops = list()

    def add_update_one(self, selector, command):
        new_op = UpdateOne(selector, command, upsert=True)
        self.ops.append(new_op)

        if len(self.ops) >= self.write_interval:
            self.bulk_exec()

    def add_update_many(self, selector, command):
        new_op = UpdateMany(filter=selector, update=command)
        self.ops.append(new_op)
        if len(self.ops) >= self.write_interval:
            self.bulk_exec()

    def batch_insert(self, docs):
        if not docs:
            return
        for doc in tqdm(docs):
            self.ops.append(InsertOne(doc))

        if len(self.ops) >= self.write_interval:
            self.bulk_exec()

    def add_replace(self, selector, replacement):
        self.ops.append(ReplaceOne(filter=selector, replacement=replacement))
        if len(self.ops) >= self.write_interval:
            self.bulk_exec()

    def batch_update_mongo(self, docs):
        if not docs:
            return
        print("updating", len(docs), "mongo docs..")
        for doc in tqdm(docs):
            if not doc:
                continue
            link = doc.get(keys.LINK)
            if not link:
                continue
            selector = {keys.LINK: link}
            command = {"$set": doc}
            self.add_update_one(selector, command)

        self.bulk_exec()


@contextmanager
def exec_remaining_ops(mongo_sync):
    yield mongo_sync
    mongo_sync.bulk_exec()


if __name__ == "__main__":
    ...