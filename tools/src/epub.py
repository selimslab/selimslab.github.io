import ebooklib
from ebooklib import epub
from pathlib import Path
import html2text
from util.txt import alphanumeric_only
import re
from bs4 import BeautifulSoup
from rich import print
import json

INPUT_DIR = Path('/Users/selimozturk/Desktop/books')
OUTPUT_DIR = Path(__file__).parent.parent / "books"


def print_toc(file_path):
    book = epub.read_epub(file_path)
    
    def print_toc_item(item, indent=0):
        """Recursively print TOC items with proper indentation."""
        prefix = "  " * indent
        
        if isinstance(item, tuple):
            # This is a section with title and sub-items
            if len(item) == 2:
                section_title, sub_items = item
                if hasattr(section_title, 'title'):
                    print(f"{prefix}{section_title.title}")
                elif isinstance(section_title, str):
                    print(f"{prefix}{section_title}")
                else:
                    print(f"{prefix}{section_title}")
                
                # Print sub-items with increased indentation
                for sub_item in sub_items:
                    print_toc_item(sub_item, indent + 1)
        else:
            # This is a single item (Link or Chapter)
            if hasattr(item, 'title'):
                print(f"{prefix}{item.title}")
            elif hasattr(item, 'get_name'):
                print(f"{prefix}{item.get_name()}")
            else:
                print(f"{prefix}{str(item)}")
    
    # Print the table of contents
    if hasattr(book, 'toc') and book.toc:
        print("Table of Contents:")
        print("=" * 50)
        for item in book.toc:
            print_toc_item(item)
    else:
        print("No table of contents found in this EPUB file.")


def epub2md(file_path):
    """Convert EPUB to markdown. Follow TOC. 
    
    Create a new directory for the book under OUTPUT_DIR.
    Create a new directory for each chapter.
    Create a new markdown file for each section. Deeper level content goes into section file as well 
    Use sth similar to analyze_toc_hierarchy from pdf.py to determine the hierarchy of the chapters and sections.
    
    Example output: 
        books/
            book_title/
                chapter_title/
                    section_title.md
                    ... 

    

    """
    book = epub.read_epub(file_path)
    
    # Create book directory
    book_title = alphanumeric_only(file_path.stem)
    book_dir = OUTPUT_DIR / book_title
    book_dir.mkdir(parents=True, exist_ok=True)
    
    # Create HTML to text converter
    h = html2text.HTML2Text()
    h.ignore_links = True
    h.ignore_images = True
    
    # Extract TOC structure and content
    toc_items = extract_toc_items(book.toc)
    
    if not toc_items:
        print("No TOC found, processing all documents in order")
        process_documents_without_toc(book, book_dir, h)
        return
    
    # Process TOC items
    chapter_counter = 0
    current_chapter_dir = None
    
    for item in toc_items:
        level, title, href = item
        
        # Get content for this item
        content = get_content_for_href(book, href)
        if not content:
            continue
        
        # Convert HTML to markdown
        markdown_content = h.handle(content)
        
        if level == 1:  # Chapter level
            chapter_counter += 1
            chapter_name = f"{chapter_counter:02d}_{alphanumeric_only(title)}"
            current_chapter_dir = book_dir / chapter_name
            current_chapter_dir.mkdir(exist_ok=True)
            
            # Save chapter content
            section_name = f"01_{alphanumeric_only(title)}"
            save_markdown_file(current_chapter_dir, section_name, title, markdown_content)
            
        else:  # Section level
            if current_chapter_dir is None:
                # No chapter defined, create default chapter
                chapter_counter += 1
                chapter_name = f"{chapter_counter:02d}_default"
                current_chapter_dir = book_dir / chapter_name
                current_chapter_dir.mkdir(exist_ok=True)
            
            # Save section content
            section_counter = len(list(current_chapter_dir.glob("*.md"))) + 1
            section_name = f"{section_counter:02d}_{alphanumeric_only(title)}"
            save_markdown_file(current_chapter_dir, section_name, title, markdown_content)
    
    print(f"EPUB converted to markdown in: {book_dir}")


def extract_toc_items(toc, level=1):
    """Extract TOC items with their hierarchy levels."""
    items = []
    
    for item in toc:
        if isinstance(item, tuple) and len(item) == 2:
            # This is a section with title and sub-items
            section_title, sub_items = item
            
            # Add the section itself
            if hasattr(section_title, 'title') and hasattr(section_title, 'href'):
                items.append((level, section_title.title, section_title.href))
            
            # Add sub-items with increased level
            items.extend(extract_toc_items(sub_items, level + 1))
        else:
            # This is a single item
            if hasattr(item, 'title') and hasattr(item, 'href'):
                items.append((level, item.title, item.href))
    
    return items


def get_content_for_href(book, href):
    """Get HTML content for a specific href from the EPUB."""
    try:
        # Remove fragment identifier if present
        if '#' in href:
            href = href.split('#')[0]
        
        # Find the item in the book
        for item in book.get_items():
            if item.get_type() == ebooklib.ITEM_DOCUMENT:
                if item.get_name() == href or item.get_name().endswith(href):
                    return item.get_content().decode('utf-8')
        
        return None
    except Exception as e:
        print(f"Error getting content for {href}: {e}")
        return None


def save_markdown_file(directory, filename, title, content):
    """Save markdown content to a file."""
    if not content.strip():
        return
    
    # Add title as heading if not already present
    if not content.startswith('#'):
        content = f"# {title}\n\n{content}"
    
    output_file = directory / f"{filename}.md"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content.strip())


def process_documents_without_toc(book, book_dir, h):
    """Process all documents when no TOC is available."""
    counter = 0
    
    for item in book.get_items():
        if item.get_type() == ebooklib.ITEM_DOCUMENT:
            counter += 1
            
            # Get content
            try:
                content = item.get_content().decode('utf-8')
                markdown_content = h.handle(content)
                
                if markdown_content.strip():
                    # Try to extract title from content
                    soup = BeautifulSoup(content, 'html.parser')
                    title_tag = soup.find(['h1', 'h2', 'h3', 'title'])
                    title = title_tag.get_text().strip() if title_tag else f"Document {counter}"
                    
                    # Create chapter directory
                    chapter_name = f"{counter:02d}_{alphanumeric_only(title)}"
                    chapter_dir = book_dir / chapter_name
                    chapter_dir.mkdir(exist_ok=True)
                    
                    # Save content
                    save_markdown_file(chapter_dir, "01_content", title, markdown_content)
                    
            except Exception as e:
                print(f"Error processing document {counter}: {e}")
                continue


def cli():
    """Command-line interface for the book chapter extractor."""
    while True:
        user_input = input("epub path: ").strip()
        
        if not user_input:
            continue

        file_path = INPUT_DIR / user_input
        
        epub2md(file_path)


if __name__ == "__main__":
    cli()
