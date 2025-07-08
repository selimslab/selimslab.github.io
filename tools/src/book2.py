import ebooklib
from ebooklib import epub
from bs4 import BeautifulSoup
import re
from pathlib import Path
from src.util.fs import clean_filename, write_file

WORKSPACE_ROOT = Path(__file__).parent.parent
OUTPUT_DIR = WORKSPACE_ROOT / ".books"


def get_document_by_href(book, href):
    """Find document item by href."""
    item_id = href.split("#")[0]
    for doc in book.get_items():
        if doc.get_name() == item_id:
            return doc
    return None


def extract_text_from_document(doc):
    """Extract clean text from document."""
    if not doc or doc.get_type() != ebooklib.ITEM_DOCUMENT:
        return ""

    soup = BeautifulSoup(doc.get_content(), "html.parser")
    text = soup.get_text()
    return re.sub(r"\s+", " ", text).strip()


def get_navigation_point(item):
    """Extract navigation point info from TOC item."""
    if isinstance(item, tuple):
        section, children = item
        if hasattr(section, "title") and hasattr(section, "href"):
            return section, children
    elif hasattr(item, "title") and hasattr(item, "href"):
        return item, None
    return None, None


def flatten_toc(toc_items, level=0):
    """Flatten TOC into a list with levels."""
    flattened = []

    for item in toc_items:
        nav_point, children = get_navigation_point(item)

        if nav_point:
            flattened.append((level, nav_point.title, nav_point.href))

        if children:
            flattened.extend(flatten_toc(children, level + 1))

    return flattened


def prepare_output_dir(epub_path):
    """Create and clean output directory."""
    book_name = epub_path.stem
    output_dir = OUTPUT_DIR / book_name
    output_dir.mkdir(parents=True, exist_ok=True)

    # Clean existing files
    for file in output_dir.glob("*"):
        file.unlink()

    return output_dir


def extract_chapters(epub_path):
    """Extract chapters from EPUB and save as markdown files."""
    try:
        book = epub.read_epub(epub_path)

        if not hasattr(book, "toc") or not book.toc:
            print(f"Warning: No TOC found in {epub_path}")
            return

        # Flatten TOC to get all entries with levels
        toc_entries = flatten_toc(book.toc)

        if not toc_entries:
            print(f"Warning: No chapters found in {epub_path}")
            return

        output_dir = prepare_output_dir(epub_path)

        # Track current chapter
        current_chapter_content = ""
        current_chapter_filename = None
        chapter_count = 0

        print(f"Found {len(toc_entries)} entries in {epub_path.name}")

        # Process each TOC entry
        for level, title, href in toc_entries:
            doc = get_document_by_href(book, href)
            content = extract_text_from_document(doc)

            if not content:
                continue

            # Create heading with appropriate level
            heading = "#" * (level + 1)
            section_content = f"{heading} {title}\n\n{content}\n\n"

            if level == 0:
                # Save previous chapter if exists
                if current_chapter_content and current_chapter_filename:
                    output_file = output_dir / current_chapter_filename
                    with open(output_file, "w", encoding="utf-8") as f:
                        f.write(current_chapter_content.strip())

                # Start new chapter
                chapter_count += 1
                clean_title = clean_filename(title)
                if not clean_title:
                    clean_title = f"chapter_{chapter_count}"

                if clean_title[0].isdigit() or clean_title.lower().startswith(
                    "chapter"
                ):
                    current_chapter_filename = f"{clean_title}.md"
                else:
                    current_chapter_filename = f"x_{chapter_count:02d}_{clean_title}.md"

                current_chapter_content = section_content

            else:
                # Add to current chapter
                current_chapter_content += section_content

        # Save the last chapter
        if current_chapter_content and current_chapter_filename:
            output_file = output_dir / current_chapter_filename
            write_file(output_file, current_chapter_content.strip())

        print(f"ok: {epub_path}")

    except Exception as e:
        print(f"Error processing {epub_path}: {str(e)}")


def cli():
    while True:
        epub_path = input("epub > path to file: ").strip()
        epub_path = Path(epub_path)

        if not epub_path.exists():
            print(f"Error: File not found: {epub_path}")
            continue

        extract_chapters(epub_path)


if __name__ == "__main__":
    cli()
