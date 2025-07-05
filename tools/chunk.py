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
            
            # Process each TOC entry
            for i, (level, title, page_num) in enumerate(toc):
                # Skip entries deeper than level 2
                if level > 2:
                    continue
                    
                # Find the end page for this entry
                end_page = doc.page_count
                if i + 1 < len(toc):
                    end_page = toc[i + 1][2]
                
                # Extract content
                content = get_content_between_pages(doc, page_num, end_page)
                
                # Create markdown content with appropriate heading level
                heading = "#" * level
                markdown_content = f"{heading} {title}\n\n{content}"
                
                # Create filename
                clean_title = clean_filename(title)
                if not clean_title:
                    clean_title = f"section_{i + 1}"
                
                if clean_title[0].isdigit() or clean_title.lower().startswith("chapter"):
                    filename = f"{clean_title}.md"
                else:
                    filename = f"{i + 1:02d}_{clean_title}.md"
                output_file = output_dir / filename
                
                # Save file
                with open(output_file, "w", encoding="utf-8") as f:
                    f.write(markdown_content)
                
                print(f"Saved: {filename}")
            
            print(f"\nAll sections saved to: {output_dir}")
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
            
        success = extract_chapters(epub_path)
        if success:
            print(f"ok: {epub_path}")


if __name__ == "__main__":
    cli()
