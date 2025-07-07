import os
import fitz  # PyMuPDF
from pathlib import Path

WORKSPACE_ROOT = Path(__file__).parent.parent
OUTPUT_DIR = WORKSPACE_ROOT / "tools" / ".out"

def clean_filename(filename):
    """Remove invalid characters from filename and limit length."""
    invalid_chars = '<>:"/\\|?*#_'
    for char in invalid_chars:
        filename = filename.replace(char, ' ')
    filename = filename.strip('. ')
    return filename[:100] if len(filename) > 100 else filename


def get_content_between_pages(doc, start_page, end_page):
    """Extract text content between two pages."""
    content = ""
    for page_num in range(start_page, min(end_page, doc.page_count)):
        page = doc[page_num]
        content += page.get_text("text")
    return content


def extract_chapters(epub_path):
    """Extract chapters from EPUB and save them as markdown files."""
    try:
        book_name = epub_path.stem
        output_dir = OUTPUT_DIR / book_name
        output_dir.mkdir(parents=True, exist_ok=True)
        if output_dir.exists():
            for file in output_dir.glob("*"):
                file.unlink()
        
        with fitz.open(epub_path) as doc:
            toc = doc.get_toc()
            
            if not toc:
                print(f"Warning: No table of contents found in {epub_path}")
                return False
            
            print(f"Found {len(toc)} entries in {book_name}")
            
            # Track current chapter
            current_chapter_content = ""
            current_chapter_filename = None
            chapter_count = 0
            
            # Process each TOC entry
            for i, (level, title, page_num) in enumerate(toc):
                
                # Find the end page for this entry
                end_page = doc.page_count
                if i + 1 < len(toc):
                    end_page = toc[i + 1][2]
                
                # Extract content
                content = get_content_between_pages(doc, page_num, end_page)
                
                # Create heading with appropriate level
                heading = "#" * level
                section_content = f"{heading} {title}\n\n{content}\n\n"
                
                if level == 1:
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
                    
                    if clean_title[0].isdigit() or clean_title.lower().startswith("chapter"):
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
                with open(output_file, "w", encoding="utf-8") as f:
                    f.write(current_chapter_content.strip())
                            
            print(f"ok: {epub_path}")
            return True
            
    except Exception as e:
        print(f"Error: {epub_path}: {str(e)}")
        return False


def cli():
    while True:
        epub_path = input("chunker > path to file: ").strip()

        epub_path = Path(epub_path)
        
        if not epub_path.exists():
            print(f"Error: File not found: {epub_path}")
            continue
            
        extract_chapters(epub_path)


if __name__ == "__main__":
    cli()
