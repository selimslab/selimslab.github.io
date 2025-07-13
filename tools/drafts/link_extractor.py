#!/usr/bin/env python3
import sys
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin


def fetch_url(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    print(f"Fetching {url}...")
    response = requests.get(url, timeout=10, headers=headers)
    response.raise_for_status()
    return response.text


def extract(text):
    """Extract all links and their text from a given URL."""
    try:
        # Parse HTML
        soup = BeautifulSoup(text, "html.parser")

        # Extract links
        res = []
        for tag in soup.find_all("strong"):
            text = tag.get_text(strip=True)
            res.append(text)

        return res

    except requests.exceptions.RequestException as e:
        print(f"Error fetching URL: {e}", file=sys.stderr)
        sys.exit(1)


def normalize_url(url):
    """Add https:// prefix if the URL doesn't have a scheme."""
    if not url.startswith(("http://", "https://")):
        # If URL starts with www, add https://
        if url.startswith("www."):
            return "https://" + url
        # Otherwise add https://www.
        else:
            return "https://" + url
    return url


def get_text_from_url(url):
    url = normalize_url(url)
    parsed_url = urlparse(url)
    if not parsed_url.netloc:
        print(f"Invalid URL: {url}")
        sys.exit(1)
    text = fetch_url(url)
    return text


def main():
    INPUT_FILE = "input.txt"
    OUTPUT_FILE = "output.txt"

    # Get URL from command line argument
    if len(sys.argv) != 2:
        with open(INPUT_FILE, "r") as f:
            text = f.read()
    else:
        url = sys.argv[1]
        text = get_text_from_url(url)

    links = extract(text)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(links))


if __name__ == "__main__":
    main()
