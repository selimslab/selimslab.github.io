from ebooklib import epub
from pathlib import Path
import html2text
from util.txt import alphanumeric_only
from util.fs import clean_directory
from book import Book, Chapter, Section
from toc import get_toc

INPUT_DIR = Path('/Users/selimozturk/Desktop/books')
OUTPUT_DIR = Path(__file__).parent.parent / "books"


def get_chapters(file_path: Path)->list[Chapter]:
    """Convert EPUB to markdown. Follow TOC. 
    
    Create directories only for numbered chapters (1:, 2:, 3:, etc.).
    Use actual chapter numbers from TOC.
    Create markdown files for sections using their section numbers.
    
    Example output: 
        books/
            book_title/
                1_Introduction/
                    1.1_How to use this book.md
                2_The Nature of Complexity/
                    2.1_Complexity defined.md
                    2.2_Symptoms of complexity.md
                    2.3_Causes of complexity.md
    """
    book = epub.read_epub(file_path)
        
    h = html2text.HTML2Text()
    h.ignore_links = True
    h.ignore_images = True
    

def save_book(book: Book):
    clean_directory(book.output_dir)
    book.output_dir.mkdir(exist_ok=True)

    toc_file = book.output_dir / "_toc.md"
    with open(toc_file, "w") as f:
        f.write(book.toc)

    for chapter in book.chapters:
        chapter_dir = book.output_dir / f"{chapter.title}"
        chapter_dir.mkdir(parents=True, exist_ok=True)
        for section in chapter.sections:
            section_file = chapter_dir / f"{section.title}.md"
            with open(section_file, "w") as f:
                f.write(section.content)
def cli():
    """Command-line interface for the book chapter extractor."""
    while True:
        user_input = input("epub path: ").strip()
        
        if not user_input:
            continue
        
        file_path = INPUT_DIR / user_input
        book_title = alphanumeric_only(file_path.stem)
        book = Book(
            title=book_title,
            file_path=file_path,
            toc=get_toc(file_path),
            chapters=get_chapters(file_path),
            output_dir=OUTPUT_DIR / book_title
        )
        save_book(book)



if __name__ == "__main__":
    cli()
