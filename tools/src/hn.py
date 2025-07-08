"""
given a url,
1. get its html
2. extract text from class=comment elements
3. write all comments to .comms.txt with a new line btw each
"""

from bs4 import BeautifulSoup
from util.fs import write_file
from util.web import get_html
from util.decors import retry
from util.logs import logger
from pathlib import Path
from rich import print

WORKSPACE_ROOT = Path(__file__).parent.parent
OUT_FILE = WORKSPACE_ROOT / ".tmp" / "comms.txt"


@retry(attempts=3)
def get_comments(url):
    response = get_html(url)

    # Parse HTML
    soup = BeautifulSoup(response, "html.parser")

    # Extract comment elements
    comment_elements = soup.find_all(class_="comment")

    if not comment_elements:
        logger.error("No comments found with class='comment'")
        return

    comments = []
    for elem in comment_elements:
        comment_text = elem.get_text(strip=True)
        if comment_text:
            comments.append(comment_text)

    return comments


def cli():
    while True:
        user_input = input("hn comments - url: ").strip()

        if not (user_input.startswith("http://") or user_input.startswith("https://")):
            user_input = "https://" + user_input

        comments = get_comments(user_input)

        write_file(OUT_FILE, "\n".join(comments))

        print(f"ok: {len(comments)} comments")


if __name__ == "__main__":
    cli()
