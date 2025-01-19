---
---

from abc import ABC, abstractmethod
from typing import List, Optional
from datetime import datetime

class User:
    id: str
    username: str
    password_hash: str
    shelves: List['Shelf']
    library: 'Library'
    preferences: 'UserPreferences'

class UserPreferences:
    font_size: int
    theme: str
    reading_progress: dict  # Maps book_id to page/time position

class Content(ABC):
    id: str
    path: str
    size: int
    format: str
    
    @abstractmethod
    def get_content(self): pass

class TextContent(Content):
    encoding: str
    
class AudioContent(Content):
    duration: int
    bitrate: int

class Book:
    id: str
    title: str
    authors: List['Author']
    genres: List['Genre']
    publication_date: datetime
    text_content: Optional[TextContent]
    audio_content: Optional[AudioContent]
    metadata: dict

class MediaPlayer(ABC):
    @abstractmethod
    def play(self, content: Content): pass
    
    @abstractmethod
    def pause(self): pass
    
    @abstractmethod
    def seek(self, position): pass

class TextReader(MediaPlayer):
    current_page: int
    
class AudioPlayer(MediaPlayer):
    current_position: int

class SearchCriteria:
    title: Optional[str]
    authors: List[str]
    genres: List[str]
    date_range: tuple

class Library:
    books: List[Book]
    
    def search(self, criteria: SearchCriteria) -> List[Book]: pass
    def add_book(self, book: Book): pass
    def remove_book(self, book_id: str): pass

class Shelf:
    id: str
    name: str
    books: List[Book]
    owner: User

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