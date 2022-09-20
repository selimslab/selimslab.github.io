import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import constants as keys
from tqdm import tqdm

# Use a service account
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

firestore_client = firestore.client()
batch_size = 300


def batch_process(docs, collection, batch, func, id_key=None):
    if id_key is None:
        id_key = keys.SKU_ID
    count = 0

    for doc in docs:
        doc_id = doc.get(id_key)
        doc_ref = collection.document(doc_id)
        func(doc_ref, doc)
        # batch.set(doc_ref, doc)
        count += 1
        if count == batch_size:
            batch.commit()
            batch = firestore_client.batch()
            count = 0

    batch.commit()


def batch_update_firestore(docs, collection=None):
    if collection is None:
        collection = test_collection
    print(f"updating {len(docs)} docs")
    batch = firestore_client.batch()
    batch_process(docs, collection, batch, batch.update)


def batch_set_firestore(docs, collection=None):
    if collection is None:
        collection = test_collection
    print(f"replacing {len(docs)} fs docs")
    batch = firestore_client.batch()
    batch_process(docs, collection, batch, batch.set)


def delete_all():
    docs = skus_collection.limit(batch_size).get()
    deleted = 0
    for doc in tqdm(docs):
        if doc.id.isdigit():
            print("Deleting", doc.id)
            doc.reference.delete()
            deleted = deleted + 1

    if deleted >= batch_size:
        return delete_all()


def firestore_delete_by_ids(ids_to_delete, collection=None):
    if collection is None:
        collection = test_collection
    print(f"deleting {len(ids_to_delete)} docs")
    batch = firestore_client.batch()
    count = 0
    for object_id in tqdm(ids_to_delete):
        doc_ref = collection.document(object_id)
        batch.delete(doc_ref)
        count += 1
        if count >= batch_size:
            batch.commit()
            count = 0
            batch = firestore_client.batch()

    batch.commit()


if __name__ == "__main__":
    ...