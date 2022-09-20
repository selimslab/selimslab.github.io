from dataclasses import dataclass


@dataclass
class Credentials:
    login_url: str
    client_id: str
    client_secret: str


@dataclass
class Track:
    artist: str
    track: str
    album_image_url: str
    release_date: str
