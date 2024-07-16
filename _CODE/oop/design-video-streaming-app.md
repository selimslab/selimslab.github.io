---
layout: code
---


```py

class UID:
    ... 

class UIDGenerator:
    def generate()->UID:
        ... 

class File:
    name: str
    uid: UID
    path: Path 

class MultiPart:
    parts: list[File]

class Audio(MultiPart):
    ... 

class Video(MultiPart):
    ...

class Collection:
    def add(file:MultiPart):
        ...

    def get(uid:UID)->MultiPart:
        ... 

class Streamer:
    def stream(uid:UID)->MultiPart?:
        ... 

class User: 
    uid: UID
    username: str 
    auth_method: AuthMethod 
    favorites: Collection

class Auth:
    def signin(username, password)-> User?:
        ...

    def signup(username, password)-> User?:
        ...


class VideoApp: 
    auth: Auth 
    library: Collection 
    streamer: Streamer 

```