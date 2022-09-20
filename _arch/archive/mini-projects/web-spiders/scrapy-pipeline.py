import constants as keys
import data_services
from services.barcode.barcode_cleaner import BarcodeCleaner
from .base_pipeline import BasePipeline
from datetime import datetime
from .instant_update import instant_price_update
from .check_count import check_count
from spec.exceptions import ItemContentException
import logging


class MarketPipeline(BasePipeline):
    def __init__(self):
        super().__init__()
        self.batch = []
        self.batch_size = 256
        self.important_keys = {keys.LINK, keys.NAME, keys.PRICE, keys.MARKET, keys.SRC}
        self.bad_item_count = 0
        self.instant_update_active = True

    @staticmethod
    def log_historical_price(item):
        price = item.get(keys.PRICE)
        if price:
            # mongo doesnt accept . in keys
            price = str(price).replace(".", ",")
            log_key = keys.HISTORICAL_PRICES + "." + price
            item[log_key] = datetime.now().strftime("%m/%d/%Y, %H:%M:%S")

        return item

    def get_updates_for_existing_item(self, item):
        selector = {keys.LINK: item.pop(keys.LINK)}
        command = dict()

        barcodes = item.get(keys.BARCODES, [])
        if barcodes:
            command["$addToSet"] = {keys.BARCODES: {"$each": barcodes}}
            item.pop(keys.BARCODES)

        item = self.clean_promoted(item)
        item = self.log_historical_price(item)

        command["$set"] = item

        return selector, command

    def process_batch(self):
        links = [item.get(keys.LINK) for item in self.batch]

        existing_links_cursor = data_services.get_sku_ids_by_links(links)

        existing_link_id_pairs = {
            doc.get(keys.LINK): doc.get(keys.SKU_ID) for doc in existing_links_cursor
        }
        existing_link_id_pairs = {
            k: v for k, v in existing_link_id_pairs.items() if k and v
        }

        instant_update_batch = []

        for item in self.batch:
            link = item.get(keys.LINK)
            if link in existing_link_id_pairs:
                if self.instant_update_active:
                    instant_update_batch.append((link, item))
                selector, command = self.get_updates_for_existing_item(item)
                self.mongo_sync.add_update_one(selector, command)
            else:
                # new doc
                selector = {keys.LINK: item.get(keys.LINK)}
                command = {"$set": item}
                self.mongo_sync.add_update_one(selector, command)

        logging.info(
            f"{len(instant_update_batch)} of {(len(self.batch))} docs for instant update.."
        )
        if instant_update_batch:
            instant_price_update(existing_link_id_pairs, instant_update_batch)

    def process_item(self, item, spider):
        item = self.clean_item(item)
        if not item:
            return {}

        item[keys.BARCODES] = BarcodeCleaner.get_clean_barcodes(
            item.get(keys.BARCODES, [])
        )

        # remove empty and None values
        item = self.clean_item(item)
        if any(key not in item for key in self.important_keys):
            self.bad_item_count += 1

        if hasattr(spider, "instant_update_active"):
            self.instant_update_active = spider.instant_update_active

        self.batch.append(item)
        if len(self.batch) > self.batch_size:
            self.process_batch()
            self.batch = []

        return item

    def close_spider(self, spider):
        stats = spider.crawler.stats.get_stats()
        self.process_batch()
        self.mongo_sync.bulk_exec()

        check_count(spider.name, stats)
        if self.bad_item_count > 100:
            raise ItemContentException(
                f"{self.bad_item_count} bad items in {spider.name}"
            )


def instant_price_update(existing_link_id_pairs, instant_update_batch):
    existing_ids = [id for id in existing_link_id_pairs.values() if id]
    if not existing_ids:
        return

    body = {
        "_source": {"includes": ["prices"]},
        "query": {"ids": {"values": existing_ids}},
    }

    existing_elastic_docs = data_services.elastic.scroll(body=body)

    id_price_pairs = {
        doc.get("_id"): doc.get("_source", {}).get("prices", {})
        for doc in existing_elastic_docs
    }

    instant_updates = []

    for link, item in instant_update_batch:
        sku_id = existing_link_id_pairs.get(link)
        old_prices = id_price_pairs.get(sku_id)
        if old_prices:
            price_update = {item.get(keys.MARKET): item.get(keys.PRICE)}
            new_prices = {**old_prices, **price_update}
            update = {keys.SKU_ID: sku_id, keys.PRICES: new_prices}
            instant_updates.append(update)

    data_services.elastic.update_docs(instant_updates, index="products")
    data_services.batch_update_firestore(instant_updates, collection=skus_collection)