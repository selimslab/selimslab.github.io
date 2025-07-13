from pathlib import Path
from ebooklib import epub

def get_toc(file_path: Path) -> str:
    book = epub.read_epub(file_path)
    output_lines = []
    
    def collect_toc_item(item, indent=0):
        """Recursively collect TOC items with proper indentation."""
        prefix = "  " * indent
        
        if isinstance(item, tuple):
            # This is a section with title and sub-items
            if len(item) == 2:
                section_title, sub_items = item
                if hasattr(section_title, 'title'):
                    output_lines.append(f"{prefix}{section_title.title}")
                elif isinstance(section_title, str):
                    output_lines.append(f"{prefix}{section_title}")
                else:
                    output_lines.append(f"{prefix}{section_title}")
                
                # Collect sub-items with increased indentation
                for sub_item in sub_items:
                    collect_toc_item(sub_item, indent + 1)
        else:
            # This is a single item (Link or Chapter)
            if hasattr(item, 'title'):
                output_lines.append(f"{prefix}{item.title}")
            elif hasattr(item, 'get_name'):
                output_lines.append(f"{prefix}{item.get_name()}")
            else:
                output_lines.append(f"{prefix}{str(item)}")
    
    # Collect the table of contents
    if hasattr(book, 'toc') and book.toc:
        output_lines.append("Table of Contents:")
        output_lines.append("=" * 50)
        for item in book.toc:
            collect_toc_item(item)
    else:
        output_lines.append("No table of contents found in this EPUB file.")
    
    return '\n'.join(output_lines)
