import fitz  # PyMuPDF
from pathlib import Path
from src.util.fs import clean_filename, write_file

WORKSPACE_ROOT = Path(__file__).parent.parent
OUTPUT_DIR = WORKSPACE_ROOT / ".books"


def get_content_between_pages(doc, start_page, end_page):
    """Extract text content between two pages, preserving paragraphs."""
    content = ""
    for page_num in range(start_page, min(end_page, doc.page_count)):
        page = doc[page_num]
        blocks = page.get_text("blocks")

        for block in blocks:
            text = block[4]  # block[4] contains the text
            if text.strip():  # Skip empty blocks
                content += text.strip() + "\n\n"

    return content


def setup_output_directory(book_name):
    """Set up and clean the output directory for a book."""
    output_dir = OUTPUT_DIR / book_name
    output_dir.mkdir(parents=True, exist_ok=True)

    # Clean existing files
    if output_dir.exists():
        for file in output_dir.glob("*"):
            file.unlink()

    return output_dir


def get_toc_entries(doc, epub_path):
    """Extract and validate table of contents from document."""
    toc = doc.get_toc()

    if not toc:
        print(f"Warning: No table of contents found in {epub_path}")
        return None

    print(f"Found {len(toc)} entries in {epub_path.stem}")
    return toc


def create_chapter_filename(title, chapter_count):
    """Generate a proper filename for a chapter."""
    clean_title = clean_filename(title)
    if not clean_title:
        clean_title = f"chapter_{chapter_count}"

    if clean_title[0].isdigit() or clean_title.lower().startswith("chapter"):
        return f"{clean_title}.md"
    else:
        return f"x_{chapter_count:02d}_{clean_title}.md"


def save_chapter(output_dir, filename, content):
    """Save chapter content to a file."""
    if content and filename:
        output_file = output_dir / filename
        write_file(output_file, content.strip())


def format_section_content(level, title, content):
    """Format section content with appropriate markdown heading."""
    heading = "#" * level
    return f"{heading} {title}\n\n{content}\n\n"


def process_toc_entries(doc, toc, output_dir):
    """Process table of contents entries and organize them into chapters."""
    current_chapter_content = ""
    current_chapter_filename = None
    chapter_count = 0

    for i, (level, title, page_num) in enumerate(toc):
        # Find the end page for this entry
        end_page = doc.page_count
        if i + 1 < len(toc):
            end_page = toc[i + 1][2]

        # Extract and format content
        content = get_content_between_pages(doc, page_num, end_page)
        section_content = format_section_content(level, title, content)

        if level == 1:
            # Save previous chapter if exists
            save_chapter(output_dir, current_chapter_filename, current_chapter_content)

            # Start new chapter
            chapter_count += 1
            current_chapter_filename = create_chapter_filename(title, chapter_count)
            current_chapter_content = section_content
        else:
            # Add to current chapter
            current_chapter_content += section_content

    # Save the last chapter
    save_chapter(output_dir, current_chapter_filename, current_chapter_content)


def extract_chapters(epub_path):
    """Extract chapters from EPUB and save them as markdown files."""
    try:
        book_name = epub_path.stem
        output_dir = setup_output_directory(book_name)

        with fitz.open(epub_path) as doc:
            toc = get_toc_entries(doc, epub_path)
            if toc:
                process_toc_entries(doc, toc, output_dir)
                print(f"ok: {epub_path}")

    except Exception as e:
        print(f"Error: {epub_path}: {str(e)}")


def cli():
    while True:
        epub_path = input("book path: ").strip()

        epub_path = Path(epub_path)

        if not epub_path.exists():
            print(f"Error: File not found: {epub_path}")
            continue

        extract_chapters(epub_path)


if __name__ == "__main__":
    cli()
