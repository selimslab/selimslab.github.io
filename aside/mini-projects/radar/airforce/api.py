import json
import os
from dataclasses import dataclass
from typing import Optional

import requests
from dotenv import load_dotenv
from requests.exceptions import RequestException

from .util.logger import logger
from .util.url import update_url_query_params


@dataclass
class TrackingStreamClient:
    api_url: str
    api_auth_token: str
    last_seen_position_token: str = "LATEST"

    def stream_generator(self, api_url):
        headers = {"Authorization": f"Bearer {self.api_auth_token}"}
        try:
            with requests.get(self.api_url, stream=True, headers=headers) as r:
                if r.encoding is None:
                    r.encoding = "utf-8"

                for line in r.iter_lines():
                    # filter out keep-alive new lines
                    if line:
                        line = json.loads(line)
                        yield line
        except RequestException as e:
            logger.error(e)
            # When a generator throws an exception, it exits.
            # You can't continue consuming the items it generates.
            # so yield instead of raise
            raise e

    def target_update_generator(self):
        gen = self.stream_generator(self.api_url)
        while True:
            try:
                line = next(gen)
                if "positionToken" in line:
                    token = line["positionToken"]
                    self.last_seen_position_token = token
                    continue
                elif "target" in line:
                    target = line["target"]
                    yield target
            except RequestException as e:
                # recover from network errors, for example connection lost
                # continue where you left

                # update position token
                self.api_url = update_url_query_params(
                    self.api_url, {"position_token": self.last_seen_position_token}
                )
                # create a new generator
                gen = self.stream_generator(self.api_url)
            except Exception as e:
                # log and raise any other error
                # for example a KeyError
                logger.error(e)
                raise e


# factory
def create_spire_api_client() -> TrackingStreamClient:
    load_dotenv()
    api_url = os.getenv("API_URL")
    api_auth_token = os.getenv("API_TOKEN")

    if api_url and api_auth_token:
        api_client = TrackingStreamClient(api_url, api_auth_token)
        return api_client
    else:
        raise Exception("please make sure you have API_URL and API_TOKEN in .env")


# singleton
tracking_stream_api_client = create_spire_api_client()
