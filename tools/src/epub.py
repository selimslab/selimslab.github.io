import ebooklib
from ebooklib import epub
from pathlib import Path
import re
from bs4 import BeautifulSoup
import html2text
# Remove fitz import since we're using ebooklib's TOC
# import fitz  # PyMuPDF


INPUT_DIR = Path('/Users/selimozturk/Desktop/books')
OUTPUT_DIR = Path(__file__).parent.parent / "books"


def get_chapter_titles_from_toc(book):
    """Extract chapter titles from EPUB table of contents."""
    titles = {}
    
    # Try to get titles from TOC
    if hasattr(book, 'toc') and book.toc:
        for item in book.toc:
            if hasattr(item, 'href') and hasattr(item, 'title'):
                # Clean href to match item names
                href = item.href.split('#')[0]  # Remove fragment
                titles[href] = item.title
    
    return titles


def get_chapter_titles_from_spine(book):
    """Extract chapter titles from spine order with fallback names."""
    titles = {}
    
    # Get titles from spine items
    for i, item in enumerate(book.spine):
        # item[0] is the id, item[1] is the item object
        if hasattr(item[1], 'file_name'):
            file_name = item[1].file_name
            if hasattr(item[1], 'title') and item[1].title:
                titles[file_name] = item[1].title
            else:
                titles[file_name] = f"Chapter {i + 1}"
    
    return titles


def extract_chapters(file_path):
    """Extract chapters from EPUB file and convert to markdown."""
    try:
        # Read the EPUB file
        book = epub.read_epub(file_path)
        
        # Get chapter titles from TOC and spine
        toc_titles = get_chapter_titles_from_toc(book)
        spine_titles = get_chapter_titles_from_spine(book)
        
        # Create output directory for this book
        book_name = file_path.stem
        book_dir = OUTPUT_DIR / book_name
        book_dir.mkdir(parents=True, exist_ok=True)
        
        # Initialize HTML to markdown converter
        h = html2text.HTML2Text()
        h.ignore_links = True
        h.ignore_images = True
        h.body_width = 0  # Don't wrap lines
        
        chapter_count = 0
        
        # Process each item in the book
        for item in book.get_items():
            if item.get_type() == ebooklib.ITEM_DOCUMENT:
                # Extract content
                content = item.get_content().decode('utf-8')
                
                # Parse HTML content
                soup = BeautifulSoup(content, 'html.parser')
                
                # Skip if no meaningful content
                if not soup.get_text().strip():
                    continue
                
                # Get title from TOC first, then spine, then fallback to HTML parsing
                title = None
                item_name = item.get_name()
                
                if item_name in toc_titles:
                    title = toc_titles[item_name]
                elif item_name in spine_titles:
                    title = spine_titles[item_name]
                else:
                    # Fallback to HTML parsing
                    for tag in ['h1', 'h2', 'title']:
                        if soup.find(tag):
                            title = soup.find(tag).get_text().strip()
                            break
                
                if not title:
                    title = f"Chapter {chapter_count + 1}"
                
                # Clean title for filename
                safe_title = re.sub(r'[^\w\s-]', '', title)
                safe_title = re.sub(r'[-\s]+', '-', safe_title)
                safe_title = safe_title.strip('-')
                
                # Convert HTML to markdown
                markdown_content = h.handle(content)
                
                # Create chapter file
                chapter_file = book_dir / f"{chapter_count + 1:02d}-{safe_title}.md"
                
                with open(chapter_file, 'w', encoding='utf-8') as f:
                    f.write(f"# {title}\n\n")
                    f.write(markdown_content)
                
                chapter_count += 1
                print(f"Extracted: {title}")
        
        print(f"Successfully extracted {chapter_count} chapters to {book_dir}")
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}") 


def cli():
    """Command-line interface for the book chapter extractor."""
    while True:
        user_input = input("book path: ").strip()
        
        if not user_input:
            continue

        file_path = INPUT_DIR / user_input
        extract_chapters(file_path)


if __name__ == "__main__":
    cli()
