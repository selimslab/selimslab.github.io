from pathlib import Path
from ebooklib import epub

def get_toc(file_path: Path) -> dict:
    book = epub.read_epub(file_path)
    
    def collect_toc_item(item):
        """Recursively collect TOC items as nested JSON structure."""
        if isinstance(item, tuple):
            # This is a section with title and sub-items
            if len(item) == 2:
                section_title, sub_items = item
                
                # Get the title
                if hasattr(section_title, 'title'):
                    title = section_title.title
                elif isinstance(section_title, str):
                    title = section_title
                else:
                    title = str(section_title)
                
                # Collect sub-items recursively
                children = []
                for sub_item in sub_items:
                    children.append(collect_toc_item(sub_item))
                
                return {
                    "title": title,
                    "children": children
                }
        else:
            # This is a single item (Link or Chapter)
            if hasattr(item, 'title'):
                title = item.title
            elif hasattr(item, 'get_name'):
                title = item.get_name()
            else:
                title = str(item)
            
            return {
                "title": title
            }
    
    # Build the table of contents structure
    if hasattr(book, 'toc') and book.toc:
        toc_items = []
        for item in book.toc:
            toc_items.append(collect_toc_item(item))
        
        return {
            "table_of_contents": toc_items
        }
    else:
        return {
            "table_of_contents": [],
            "message": "No table of contents found in this EPUB file."
        }