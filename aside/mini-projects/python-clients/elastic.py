from elasticsearch import Elasticsearch
from elasticsearch import helpers
from tqdm import tqdm
import logging
import constants as keys


class Elastic:
    cred = [ # your url ]
    es = Elasticsearch(cred)
    es_log = logging.getLogger("elasticsearch")
    es_log.setLevel(logging.CRITICAL)
    batch_size = 2048

    @staticmethod
    def elastic_update_generator(docs: list, index):
        for doc in docs:
            yield {
                "_index": index,
                "_op_type": "update",
                "_type": "_doc",
                "_id": doc.get(keys.SKU_ID),
                "doc_as_upsert": True,
                "doc": doc,
            }

    @staticmethod
    def elastic_replace_generator(docs: list, index):
        for doc in docs:
            yield {
                "_index": index,
                "_type": "_doc",
                "_id": doc.get(keys.SKU_ID),
                "_source": doc,
            }

    @staticmethod
    def elastic_delete_generator(ids: list, index):
        ids = [id for id in ids if id]
        print("deleting", len(ids), "docs from elastic")
        for doc_id in tqdm(ids):
            yield {
                "_op_type": "delete",
                "_index": index,
                "_type": "_doc",
                "_id": doc_id,
            }

    def update_docs(self, docs: list, index):
        if index is None:
            index = "test"
        print(f"updating {len(docs)} elastic docs")
        batch, remaining_docs = docs[: self.batch_size], docs[self.batch_size :]
        helpers.bulk(self.es, self.elastic_update_generator(batch, index))
        if remaining_docs:
            self.update_docs(remaining_docs, index)

    def replace_docs(self, docs: list, index):
        if index is None:
            index = "test"
        batch, remaining_docs = docs[: self.batch_size], docs[self.batch_size :]
        print(f"replacing {len(batch)} elastic docs")
        helpers.bulk(self.es, self.elastic_replace_generator(batch, index))
        if remaining_docs:
            self.replace_docs(remaining_docs, index)

    def delete_ids(self, ids: list, index):
        if index is None:
            index = "test"
        helpers.bulk(self.es, self.elastic_delete_generator(ids, index))

    def reset_index(self, index):
        self.es.indices.delete(index)
        mapping = {
            "mappings": {
                "dynamic": False,
                "properties": {
                    "prices": {"type": "object", "dynamic": False},
                    "name": {"type": "text"},
                    "src": {"type": "text", "index": False},
                    "market_count": {"type": "integer"},
                    "variants": {"type": "text", "index": False},
                    "markets": {"type": "keyword"},
                    "barcodes": {"type": "keyword"},
                    "best_price": {"type": "float", "index": False},
                    "tags": {"type": "text"},
                },
            }
        }

        response = self.es.indices.create(
            index=index, body=mapping, ignore=400  # ignore 400 already exists code
        )
        print(response)

    def search(self, body, index=None):
        if index is None:
            index = "products"
        res = self.es.search(index=index, body=body)

        print("Got %d Hits:" % res["hits"]["total"]["value"])
        hits = res["hits"]["hits"]
        for hit in hits:
            print(hit)

        return hits

    def scroll(self, body=None, index=None, duration=None):
        if index is None:
            index = "test"
        if body is None:
            body = {}
        if duration is None:
            duration = "1m"

        # Init scroll by search
        data = self.es.search(index=index, scroll=duration, size=300, body=body)

        # Get the scroll ID
        sid = data["_scroll_id"]
        hits = data["hits"]["hits"]
        scroll_size = len(hits)

        while scroll_size > 0:
            # Before scroll, process current batch of hits
            hits = data["hits"]["hits"]
            for hit in hits:
                yield hit

            data = self.es.scroll(scroll_id=sid, scroll=duration)

            # Update the scroll ID
            sid = data["_scroll_id"]

            # Get the number of results that returned in the last scroll
            scroll_size = len(hits)


elastic = Elastic()

if __name__ == "__main__":
    elastic.search(body={}, index="test")