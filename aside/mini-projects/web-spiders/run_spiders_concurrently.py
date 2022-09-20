import logging
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings


def run_spiders_concurrently(spiders: dict):
    default_settings = get_project_settings()
    default_settings["LOG_LEVEL"] = "ERROR"

    process = CrawlerProcess(default_settings)
    crawlers = dict()
    for name, spider_class in spiders.items():
        logging.info(f"running {name}")
        crawler = process.create_crawler(spider_class)
        crawlers[name] = crawler
        try:
            process.crawl(crawler)
        except (AttributeError, TypeError, KeyError, ValueError, ImportError) as e:
            logging.error(e)
            continue

    process.start()