import scrapy
import constants as keys


class BaseSpider(scrapy.Spider):
    def __init__(self, *args, **kwargs):
        super().__init__()

        self.config = kwargs.get("config")
        self.debug = kwargs.get("debug", False)

        self.base_domain = self.config.base_domain
        self.base_url = "https://www." + self.base_domain
        
        self.start_urls = self.config.category_function(self.base_url)
        self.allowed_domains = [self.base_domain]
        
        self.next_page = True
        self.links_seen = set()

    def parse(self, response):
        table = response.css(self.config.table_selector)
        products_div = table.css(self.config.product_selector)

        for product_div in products_div:
            product = self.config.extract_function(product_div, self.base_url)
            self.links_seen.add(product.get(keys.LINK))
            yield product

        next_page_href = response.css(self.config.next_page_href).extract_first()

        if next_page_href:
            next_page_url = self.base_url + next_page_href
            yield response.follow(next_page_url, callback=self.parse)

    def close(self, reason):
        if not self.debug and self.config:
            self.logger.info("Spider closed: %s due to %s", self.name, reason)
            mark_out_of_stock(self.links_seen, self.name)

class XSpider(BaseSpider):
    name = "x"

    def __init__(self, *args, **kwargs):
        config = SpiderConfig(
            name=self.name,
            base_domain="x.com",
            category_function=get_category_urls,
            extract_function=extract_product_info,
            table_selector=".product-list-inner-container",
            product_selector=".product-box-container",
            next_page_href=".next-page a::attr(href)",
        )
        super().__init__(*args, **kwargs, config=config)