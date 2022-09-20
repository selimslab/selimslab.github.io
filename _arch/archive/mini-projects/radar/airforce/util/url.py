import urllib.parse as urlparse
from urllib.parse import urlencode


def update_url_query_params(url, params):
    url_parts = list(urlparse.urlparse(url))

    query = dict(urlparse.parse_qsl(url_parts[4]))

    query.update(params)

    url_parts[4] = urlencode(query)

    return urlparse.urlunparse(url_parts)


def test_update_url_query_params():
    url = "https://api.airsafe.spire.com/v2/targets/stream?compression=none"
    params = {"token": "test_token"}

    assert (
        update_url_query_params(url, params)
        == "https://api.airsafe.spire.com/v2/targets/stream?compression=none&token=test_token"
    )
