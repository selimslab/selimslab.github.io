---
---

```python
class Author:
    name: str 

class Genre:
    name: str

class File: 
    name: str
    size: int 

class TextFile(File):
    ...

class AudioFile(File):
    ...

class Book: 
    name: str 
    authors: List[Author]
    genres: List[Genre] 
    text: TextFile
    audio: AudioFile

    class get_text():
        ...

    class get_audio():
        ...

class Reader:
    def read_text(book:Book):
        ...

class Player:
    def play_audio(book:Book):
        ...

class Library:
    books: List[Book]

    def search():
        ... 

    def add_book(book:Book):
        ...

class Shelf:
    books: List[Book]

    def add_book():
        ...

    def remove_book():
        ...

class User: 
    username: str 
    password_hash: str 
    shelves: List[Shelf]

    def auth():
        ... 
```