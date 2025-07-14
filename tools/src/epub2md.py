from ebooklib import epub, ITEM_DOCUMENT
from pathlib import Path
from bs4 import BeautifulSoup
import re
from util.txt import alphanumeric_only
from util.fs import clean_directory
from util.cli import cli
from book import Book, Node
from toc import visit_toc, get_toc_dict, get_title
import json
from pprint import pprint

def get_content(book: Book) -> list[Node]:

    epub_book = epub.read_epub(book.file_path)
    if not epub_book:
        raise ValueError("Failed to read EPUB file")

    def extract_text_lines(soup_element):
        """Extract clean text lines from a BeautifulSoup element"""
        if isinstance(soup_element, str):
            text = soup_element
        else:
            text = soup_element.get_text()
        
        lines = []
        for line in text.split('\n'):
            line = line.strip()
            if line:
                # Clean up multiple spaces
                line = re.sub(r'\s+', ' ', line)
                lines.append(line)
        return lines
    
    def get_heading_level(element):
        """Get heading level (1-6) if element is a heading, None otherwise"""
        if hasattr(element, 'name') and element.name in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            return int(element.name[1])
        return None

    def extract_section_content(start_element, soup):
        """Extract content from start_element until the next section of same or higher level"""
        content_elements = []
        current = start_element
        
        # Get the heading level of the start element (if it's a heading)
        start_level = get_heading_level(start_element)
        
        # If start element is not a heading, include it and look for next heading
        if start_level is None:
            content_elements.append(current)
            start_level = 1  # Default level
        
        # Traverse siblings to collect content until next section
        for sibling in start_element.next_siblings:
            if hasattr(sibling, 'name'):
                sibling_level = get_heading_level(sibling)
                
                # Stop if we hit a heading of same or higher level
                if sibling_level is not None and sibling_level <= start_level:
                    break
                    
                content_elements.append(sibling)
        
        # Extract text from collected elements
        content_text = ""
        for elem in content_elements:
            if hasattr(elem, 'get_text'):
                content_text += elem.get_text() + "\n"
            elif isinstance(elem, str):
                content_text += elem + "\n"
        
        return extract_text_lines(content_text)

    # Create a mapping of href to parsed content for quick lookup
    content_map = {}
    section_map = {}  # Maps file#section to specific content
    
    for item in epub_book.get_items():
        if item.get_type() == ITEM_DOCUMENT:
            html_content = item.get_content().decode('utf-8')
            soup = BeautifulSoup(html_content, 'html.parser')
            
            # Remove script and style elements
            for script in soup(["script", "style"]):
                script.decompose()
            
            # Store the parsed soup for section extraction
            content_map[item.get_name()] = soup
            
            # Also extract sections based on common section identifiers
            sections = {}
            
            # Look for elements with id attributes (common section markers)
            for element in soup.find_all(attrs={'id': True}):
                section_id = element.get('id')
                if section_id:
                    # Extract content from this element and its siblings until next section
                    section_content = extract_section_content(element, soup)
                    if section_content:
                        sections[section_id] = section_content
            
            # Store sections for this file
            for section_id, content in sections.items():
                section_key = f"{item.get_name()}#{section_id}"
                section_map[section_key] = content
    
    print(f"Content map keys: {list(content_map.keys())}")
    print(f"Section map keys: {list(section_map.keys())}")
    
    def get_content_for_item(item):
        """Get content for a TOC item, handling fragments properly"""
        if not hasattr(item, 'href'):
            return []
        
        href = item.href
        
        # Check if there's a fragment identifier
        if '#' in href:
            file_part, fragment = href.split('#', 1)
            
            # First try to find section-specific content
            section_key = href  # file.html#section
            if section_key in section_map:
                print(f"Found section content for {section_key}")
                return section_map[section_key]
            
            # Try alternative section key format
            alt_section_key = f"{file_part}#{fragment}"
            if alt_section_key in section_map:
                print(f"Found alt section content for {alt_section_key}")
                return section_map[alt_section_key]
        else:
            file_part = href
            fragment = None
        
        # Fallback to file content
        if file_part in content_map:
            soup = content_map[file_part]
            
            if fragment:
                # Try to find the fragment within the file
                target_element = soup.find(attrs={'id': fragment})
                if target_element:
                    print(f"Found fragment {fragment} in {file_part}")
                    return extract_section_content(target_element, soup)
                
                # Try to find by name attribute as well
                target_element = soup.find(attrs={'name': fragment})
                if target_element:
                    print(f"Found fragment by name {fragment} in {file_part}")
                    return extract_section_content(target_element, soup)
            
            # Return entire file content as fallback
            print(f"Using entire file content for {file_part}")
            return extract_text_lines(soup)
        
        # Last resort: try variations of the filename
        for key in content_map.keys():
            if key.startswith(file_part.rsplit('.', 1)[0]):
                soup = content_map[key]
                print(f"Using content from similar file {key} for {href}")
                return extract_text_lines(soup)
        
        print(f"No content found for {href}")
        return []

    def create_chapter_from_item(item):
        """Create a Chapter object from a TOC item"""
        title = get_title(item)
        if not title:
            return None
        content = get_content_for_item(item)
        print(f"Created chapter '{title}' with {len(content)} content lines")
        return Node(title=title, content=content)

    chapters = []
    
    for toc_item in epub_book.toc:
        if isinstance(toc_item, tuple):
            # Section with children: (title, children)
            section_title_item, children = toc_item
            section_title = get_title(section_title_item)
            
            if section_title:
                # Create parent chapter with its own content
                section_content = get_content_for_item(section_title_item)
                section_chapter = Node(title=section_title, content=section_content)
                
                # Process children
                child_chapters = []
                for child_item in children:
                    child_chapter = create_chapter_from_item(child_item)
                    if child_chapter:
                        child_chapters.append(child_chapter)
                
                section_chapter.children = child_chapters
                chapters.append(section_chapter)
        else:
            # Simple item
            chapter = create_chapter_from_item(toc_item)
            if chapter:
                chapters.append(chapter)

    return chapters

def save_book(book: Book, output_dir: Path):
    clean_directory(output_dir)
    output_dir.mkdir(exist_ok=True)

    toc_file = output_dir / "_toc.json"
    with open(toc_file, "w") as f:
        json.dump(book.toc, f, indent=4)

    def save_chapter(chapter: Node, base_dir: Path):
        """Save chapter: create directory only if it has children, otherwise save as file"""
        if not chapter.title:
            return
            
        if chapter.children:
            # This chapter has children, so create a directory for it
            chapter_dir = base_dir / alphanumeric_only(chapter.title)
            chapter_dir.mkdir(parents=True, exist_ok=True)
            
            # Save chapter's own content if it exists
            if chapter.content:
                chapter_file = chapter_dir / f"{alphanumeric_only(chapter.title)}.md"
                with open(chapter_file, "w") as f:
                    f.write('\n'.join(chapter.content))
            
            # Save children as files within this directory
            for child in chapter.children:
                if child.content:
                    child_file = chapter_dir / f"{alphanumeric_only(child.title)}.md"
                    with open(child_file, "w") as f:
                        f.write('\n'.join(child.content))
        else:
            # This is a leaf chapter, save it as a file in the base directory
            if chapter.content:
                chapter_file = base_dir / f"{alphanumeric_only(chapter.title)}.md"
                with open(chapter_file, "w") as f:
                    f.write('\n'.join(chapter.content))

    # Save all chapters
    for chapter in book.nodes:  # Changed from book.chapters to book.nodes
        save_chapter(chapter, output_dir)


def loop(user_input:str):    
    file_path = Path(user_input)
    book_title = alphanumeric_only(file_path.stem)
    book = Book(
        title=book_title,
        file_path=file_path,
        toc=get_toc_dict(file_path)
    )
    book.nodes = get_content(book)
    output_dir = file_path.parent / book_title
    save_book(book, output_dir)
    print(f"Saved {book.title} to {output_dir}")

if __name__ == "__main__":
    cli(loop, "epub path: ")
