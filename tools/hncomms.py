'''
given a url, 
1. get its html
2. extract text from class=comment elements 
3. write all comments to .comms.txt with a new line btw each 
'''

import requests
from bs4 import BeautifulSoup
import logging

OUT_FILE = ".comms.txt"

def process_url(url, attempts=0):
    """Extract comments from HN URL and save to .comms.txt"""
    try:
        # Get HTML content
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        # Parse HTML
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract comment elements
        comment_elements = soup.find_all(class_='comment')
        
        if not comment_elements:
            print("No comments found with class='comment'")
            return
        
        # Extract text from comments
        comments = []
        for elem in comment_elements:
            comment_text = elem.get_text(strip=True)
            if comment_text:
                comments.append(comment_text)
        
        # Write to file
        with open(OUT_FILE, 'w', encoding='utf-8') as f:
            for comment in comments:
                f.write(comment + '\n\n')
        
        print(f"ok - {len(comments)} comments")
        
    except Exception as e:
        logging.error(str(e))
        if attempts < 2:
            process_url(url, attempts + 1)

def cli():
    while True:
        user_input = input("hn comments - url: ").strip()
        
        if not user_input:
            print("try again")
            continue
            
        # Basic URL validation
        if not (user_input.startswith('http://') or user_input.startswith('https://')):
            user_input = 'https://' + user_input
        
        process_url(user_input)

if __name__ == "__main__":
    cli()
