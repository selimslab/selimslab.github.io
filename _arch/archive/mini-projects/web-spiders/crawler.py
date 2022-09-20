import asyncio
import logging
import collections
import urllib.parse
from pprint import pprint
import aiohttp
import bs4


class AsyncCrawler:
    """ a concurrent web crawler """

    def __init__(self, max_concurrency=None):
        self.start_url = None
        self.root_netloc = None
        self.session = None

        self.todo = set()
        self.busy = set()
        self.done = set()

        if max_concurrency is None:
            max_concurrency = 400
        self.sem = asyncio.Semaphore(max_concurrency)

        self.timeout = 16  # seconds

        self.sitemap = collections.defaultdict(set)

    async def fetch(self, url):
        async with self.session.get(url) as response:
            if response.status == 200:
                return await response.content.read()

    async def parse(self, data, url):
        soup = bs4.BeautifulSoup(data, features="html.parser")
        links = set(a.get("href") for a in soup.find_all("a", href=True))
        for link in links:
            asyncio.create_task(self.filter_url(link, url))

    async def crawl(self, url):
        self.todo.remove(url)
        self.busy.add(url)
        try:
            data = await self.fetch(url)
            if data:
                await self.parse(data, url)
        except aiohttp.client_exceptions.ClientError as e:
            logging.info(f"{url}, 'has error', {repr(str(e))}")
        finally:
            self.busy.remove(url)
            self.done.add(url)
            print(
                f"{len(self.todo)} todo, {len(self.busy)} pending, {len(self.done)} done"
            )
            self.sem.release()

    async def filter_url(self, url, parent_url):
        """ Crawl all links to a domain and its sub-domains """
        url = urllib.parse.urljoin(parent_url, url)
        url, frag = urllib.parse.urldefrag(url)
        parsed_link = urllib.parse.urlparse(url)
        is_same_domain = self.root_netloc in parsed_link.netloc
        is_relevant_url = (
                is_same_domain
                and url not in self.todo
                and url not in self.busy
                and url not in self.done
        )
        if is_relevant_url:
            self.sitemap[parsed_link.netloc].add(parsed_link.path)
            await self.add_url(url)

    async def add_url(self, url):
        self.todo.add(url)
        await self.sem.acquire()
        asyncio.create_task(self.crawl(url))

    async def run(self):
        timeout = aiohttp.ClientTimeout(total=self.timeout)
        # ClientSession is for connection pooling and HTTP keep-alives
        self.session = aiohttp.ClientSession(timeout=timeout)
        crawl = asyncio.create_task(self.add_url(self.start_url))
        await asyncio.sleep(1)
        while self.busy:
            await asyncio.sleep(1)
        await crawl
        await self.session.close()

    def start(self, start_url):
        loop = asyncio.get_event_loop()
        self.start_url = start_url
        self.root_netloc = urllib.parse.urlparse(start_url).netloc
        loop.run_until_complete(asyncio.gather(self.run()))
        return self.sitemap


def test_crawler():
    start_url = "https://example.com"
    c = AsyncCrawler()
    sitemap = c.start(start_url)
    pprint(sitemap)


if __name__ == "__main__":
    test_crawler()
