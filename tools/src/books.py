import fitz  # PyMuPDF
from pathlib import Path
from util.fs import write_file, ensure_clean_directory
from util.txt import split_into_sentences, alphanumeric_only

OUTPUT_DIR = Path(__file__).parent.parent / "books"


def extract_text_from_page_range(doc, start_page, end_page):
    """Extract and clean text content from a range of pages."""
    raw_text = []
    for page_num in range(start_page, min(end_page, doc.page_count)):
        page = doc[page_num]
        blocks = page.get_text("blocks")

        for block in blocks:
            text = block[4]  # block[4] contains the text
            if text.strip():  # Skip empty blocks
                raw_text.append(text.strip())

    # Join all text blocks with spaces, then split into sentences
    full_text = " ".join(raw_text)
    sentences = split_into_sentences(full_text)
    
    return sentences


def analyze_toc_hierarchy(toc):
    """Analyze TOC structure to determine optimal hierarchy levels."""
    if not toc:
        return None
    
    levels = [level for level, _, _ in toc]
    min_level = min(levels)
    max_level = max(levels)
    unique_levels = sorted(set(levels))
    
    # Determine section level (minimum file unit)
    # If we have 3+ levels, use the middle-ish level as section
    # If we have 2 levels, use level 2 as section
    # If we have 1 level, use that as section
    if len(unique_levels) >= 3:
        section_level = unique_levels[1]  # Second level becomes section
    elif len(unique_levels) == 2:
        section_level = unique_levels[1]  # Second level becomes section
    else:
        section_level = unique_levels[0]  # Only level becomes section
    
    # Levels above section_level become folders
    folder_levels = [level for level in unique_levels if level < section_level]
    
    return {
        'min_level': min_level,
        'max_level': max_level,
        'unique_levels': unique_levels,
        'section_level': section_level,
        'folder_levels': folder_levels
    }


def print_toc_structure_info(structure):
    """Print information about the detected TOC structure."""
    if structure:
        print(f"Detected structure:")
        print(f"  Levels found: {structure['unique_levels']}")
        print(f"  Folder levels: {structure['folder_levels']}")
        print(f"  Section level: {structure['section_level']}")
        print(f"  Subsection levels: {[l for l in structure['unique_levels'] if l > structure['section_level']]}")


def setup_book_output_directory(book_name):
    """Set up and clean the output directory for a book."""
    output_dir = OUTPUT_DIR / book_name
    return ensure_clean_directory(output_dir)


def create_safe_filename(title, counter):
    """Generate a safe filename from title and counter."""
    clean_title = alphanumeric_only(title)
    if not clean_title:
        clean_title = f"item_{counter}"
    return f"{counter:02d}_{clean_title}"


def save_section_content(directory, filename, content_list):
    """Save section content to a markdown file with one sentence per line."""
    if not content_list:
        return
    
    # Join sentences with newlines to ensure one sentence per line
    content = "\n".join(content_list)
    output_file = directory / f"{filename}.md"
    write_file(output_file, content.strip())


def save_toc_index(output_dir, toc):
    """Save table of contents as a markdown index file."""
    if not toc:
        return
    
    content = ["# Table of Contents\n"]
    
    for level, title, page_num in toc:
        # Create indentation based on level
        indent = "  " * (level - 1)
        # Format as markdown list item
        content.append(f"{indent}- {title} (page {page_num})")
    
    index_file = output_dir / "00_index.md"
    write_file(index_file, "\n".join(content))


def format_markdown_heading(level, title):
    """Format a markdown heading with proper level."""
    return f"\n{'#' * level} {title}\n"


def get_current_directory(output_dir, current_path, folder_levels):
    """Build current directory path from folder levels."""
    path = output_dir
    for level in sorted(folder_levels):
        if level in current_path:
            folder_name = current_path[level][0]
            path = path / folder_name
    return path


def save_current_section(output_dir, current_path, folder_levels, current_section, current_section_content):
    """Save the current section if it exists."""
    if current_section and current_section_content:
        current_dir = get_current_directory(output_dir, current_path, folder_levels)
        current_dir.mkdir(parents=True, exist_ok=True)
        save_section_content(current_dir, current_section, current_section_content)


def process_document_chapters(doc, toc, output_dir):
    """Process document chapters using the TOC structure."""
    if not toc:
        return False
    
    # Analyze and show structure
    structure = analyze_toc_hierarchy(toc)
    print_toc_structure_info(structure)
    
    # Save TOC as index
    save_toc_index(output_dir, toc)
    
    if not structure:
        return False
    
    section_level = structure['section_level']
    folder_levels = structure['folder_levels']
    
    # Track current hierarchy path
    current_path = {}  # level -> (name, counter)
    current_section = None
    current_section_content = []
    
    # Initialize counters for each level
    counters = {level: 0 for level in structure['unique_levels']}
    
    # Process all TOC entries
    for i, (level, title, page_num) in enumerate(toc):
        # Find the end page for this entry
        end_page = doc.page_count
        if i + 1 < len(toc):
            end_page = toc[i + 1][2]

        # Get content for this entry
        content_list = extract_text_from_page_range(doc, page_num, end_page)
        
        if level in folder_levels:
            # Process folder level entry
            save_current_section(output_dir, current_path, folder_levels, current_section, current_section_content)
            
            # Clear path for this level and below
            for l in list(current_path.keys()):
                if l >= level:
                    del current_path[l]
                    counters[l] = 0
            
            # Create new folder entry
            counters[level] += 1
            folder_name = create_safe_filename(title, counters[level])
            current_path[level] = (folder_name, counters[level])
            
            # Reset section
            current_section = None
            current_section_content = []
            
        elif level == section_level:
            # Process section level entry
            save_current_section(output_dir, current_path, folder_levels, current_section, current_section_content)
            
            # Clear section-level path
            for l in list(current_path.keys()):
                if l >= level:
                    del current_path[l]
                    counters[l] = 0
            
            counters[level] += 1
            section_name = create_safe_filename(title, counters[level])
            current_section = section_name
            
            # Start new section content
            current_section_content = [format_markdown_heading(1, title)]
            current_section_content.extend(content_list)
            
        elif level > section_level:
            # Process subsection level entry
            if current_section is None:
                # No section defined, create one
                counters[section_level] += 1
                current_section = f"section_{counters[section_level]:02d}"
                current_section_content = []
            
            # Add subsection content to current section
            heading_level = level - section_level + 1
            current_section_content.append(format_markdown_heading(heading_level, title))
            current_section_content.extend(content_list)
    
    # Save the final section
    save_current_section(output_dir, current_path, folder_levels, current_section, current_section_content)
    
    return True


def extract_chapters(file_path):
    """Extract chapters from document and save them as markdown files."""
    try:
        # Validate input path
        if not file_path.exists():
            print(f"Error: File not found: {file_path}")
            return
        
        if not file_path.is_file():
            print(f"Error: Path is not a file: {file_path}")
            return
        
        # Check for dangerous book names
        book_name = file_path.stem
        if book_name in [".", "..", ""] or not book_name.strip():
            print(f"Error: Invalid book name: '{book_name}'")
            return
        
        # Check file extension
        valid_extensions = {'.pdf', '.epub', '.mobi', '.azw', '.azw3', '.fb2', '.oxps', '.xps'}
        if file_path.suffix.lower() not in valid_extensions:
            print(f"Error: Unsupported file type: {file_path.suffix}")
            return

        output_dir = setup_book_output_directory(book_name)

        with fitz.open(file_path) as doc:
            toc = doc.get_toc()            
            if process_document_chapters(doc, toc, output_dir):
                print(f"ok: {file_path}")
            else:
                print(f"No TOC found in {file_path}")

    except Exception as e:
        print(f"Error: {file_path}: {str(e)}")


def cli():
    """Command-line interface for the book chapter extractor."""
    while True:
        user_input = input("book path: ").strip()
        
        # Skip empty input
        if not user_input:
            continue

        file_path = Path('/Users/selimozturk/Desktop/books', user_input)
        extract_chapters(file_path)


if __name__ == "__main__":
    cli()
