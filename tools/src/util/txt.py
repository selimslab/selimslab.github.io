import re 


def alphanumeric_only(text):
    return re.sub(r'[^a-zA-Z0-9 \-\_\.]', '', text)


def split_into_sentences(text):
    """Split text into sentences, one per line, adding dots where missing."""
    if not text.strip():
        return []
    
    # Clean up the text first
    text = text.strip()
    
    # Fix common PDF extraction issues
    # Fix ligatures (comprehensive list of common ligature characters)
    text = text.replace('ﬁ', 'fi')  # fi ligature
    text = text.replace('ﬂ', 'fl')  # fl ligature
    text = text.replace('ﬀ', 'ff')  # ff ligature
    text = text.replace('ﬃ', 'ffi') # ffi ligature
    text = text.replace('ﬄ', 'ffl') # ffl ligature
    text = text.replace('ﬆ', 'st')  # st ligature
    text = text.replace('ﬅ', 'ft')  # ft ligature
    
    # Additional ligature variants that might appear
    text = text.replace('\ufb01', 'fi')  # Unicode fi ligature
    text = text.replace('\ufb02', 'fl')  # Unicode fl ligature
    text = text.replace('\ufb00', 'ff')  # Unicode ff ligature
    text = text.replace('\ufb03', 'ffi') # Unicode ffi ligature
    text = text.replace('\ufb04', 'ffl') # Unicode ffl ligature
    text = text.replace('\ufb06', 'st')  # Unicode st ligature
    text = text.replace('\ufb05', 'ft')  # Unicode ft ligature
    
    # Fix common problematic character sequences
    text = re.sub(r'defi\s+ne', 'define', text)
    text = re.sub(r'fi\s+rst', 'first', text)
    text = re.sub(r'unscientifi\s+c', 'unscientific', text)
    
    # General pattern: fix broken ligature words
    text = re.sub(r'(\w+)fi\s+(\w+)', r'\1fi\2', text)  # Fix broken fi ligatures
    text = re.sub(r'(\w+)fl\s+(\w+)', r'\1fl\2', text)  # Fix broken fl ligatures
    text = re.sub(r'(\w+)ff\s+(\w+)', r'\1ff\2', text)  # Fix broken ff ligatures
    
    # Fix specific common broken words
    text = re.sub(r'\bfi\s+rst\b', 'first', text)
    text = re.sub(r'\bfi\s+nal\b', 'final', text)
    text = re.sub(r'\bfi\s+nd\b', 'find', text)
    text = re.sub(r'\bfi\s+le\b', 'file', text)
    text = re.sub(r'\bfi\s+ght\b', 'fight', text)
    text = re.sub(r'\bfi\s+gure\b', 'figure', text)
    text = re.sub(r'\bdefi\s+ne\b', 'define', text)
    text = re.sub(r'\bscienti\s+fi\s+c\b', 'scientific', text)
    text = re.sub(r'\bspeci\s+fi\s+c\b', 'specific', text)
    
    # Fix hyphenated words across line breaks
    text = re.sub(r'(\w+)-\s*\n\s*(\w+)', r'\1\2', text)
    text = re.sub(r'(\w+)-\s+(\w+)', r'\1\2', text)
    
    # Fix other common PDF artifacts
    text = text.replace('"', '"').replace('"', '"')  # Smart quotes
    text = text.replace(''', "'").replace(''', "'")  # Smart apostrophes
    text = text.replace('—', '-').replace('–', '-')  # Em/en dashes
    text = text.replace('…', '...')  # Ellipsis
    
    # Remove line breaks that are within sentences
    text = re.sub(r'\n+', ' ', text)
    # Normalize multiple spaces to single space
    text = re.sub(r'\s+', ' ', text)
    
    # Handle common abbreviations that shouldn't split sentences
    text = re.sub(r'\b(Mr|Mrs|Dr|Prof|Inc|Ltd|Co|etc|vs|i\.e|e\.g)\.\s+', r'\1~ABBREV~ ', text)
    
    # Split on sentence endings followed by capital letter or whitespace
    sentences = re.split(r'(?<=[.!?])\s+(?=[A-Z])', text)
    
    # If no proper sentence boundaries found, try other patterns
    if len(sentences) == 1:
        # Try splitting on periods followed by space and capital letter
        sentences = re.split(r'\.+\s+(?=[A-Z])', text)
    
    # If still one sentence, try splitting on multiple spaces (paragraph breaks)
    if len(sentences) == 1:
        sentences = re.split(r'\s{2,}', text)
    
    # Clean up sentences and add dots if missing
    cleaned_sentences = []
    for sentence in sentences:
        sentence = sentence.strip()
        if sentence:
            # Restore abbreviations
            sentence = sentence.replace('~ABBREV~', '.')
            # Add dot if sentence doesn't end with punctuation
            if not sentence.endswith(('.', '!', '?', ':', ';')):
                sentence += '.'
            cleaned_sentences.append(sentence)
    
    return cleaned_sentences
