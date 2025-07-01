import zipfile
import os
from bs4 import BeautifulSoup
from pathlib import Path

WORKSPACE_ROOT = Path(__file__).parent.parent
OUTPUT_DIR = WORKSPACE_ROOT / "tools" / ".out"


def extract_epub_chapters(epub_path):

    epub_path = WORKSPACE_ROOT / epub_path
    book_name = epub_path.stem
    output_dir = OUTPUT_DIR / book_name
    output_dir.mkdir(parents=True, exist_ok=True)

    if output_dir.exists():
        for file in output_dir.glob("*"):
            file.unlink()

    with zipfile.ZipFile(epub_path, 'r') as zip_ref:
        # Extract all files
        zip_ref.extractall(output_dir)
        
        # Find content files (usually .html or .xhtml)
        content_files = []
        for root, dirs, files in os.walk(output_dir):
            for file in files:
                if file.endswith(('.html', '.xhtml')):
                    content_files.append(os.path.join(root, file))
        
        # Process each content file
        for i, file_path in enumerate(content_files):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Clean HTML and extract text
            soup = BeautifulSoup(content, 'html.parser')
            text = soup.get_text()
            
            # Save as chapter file
            chapter_file = os.path.join(output_dir, f'chapter_{i+1:02d}.txt')
            with open(chapter_file, 'w', encoding='utf-8') as f:
                f.write(text)
    
    return True


def cli():
    while True:
        user_input = input("epub path: ").strip()
        
        if not user_input:
            print("no input")
            continue
            
        epub_path = WORKSPACE_ROOT / user_input
        if not epub_path.exists():
            print(f"Error: File not found: {user_input}")
            continue
            
        success = extract_epub_chapters(user_input)
        if success:
            print("ok")


if __name__ == "__main__":
    cli()
