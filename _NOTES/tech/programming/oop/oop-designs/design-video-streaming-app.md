---
---

```python

class Metadata:
    title: str
    description: str
    duration: int
    tags: list[str]

class Media:
    uid: UUID
    metadata: Metadata

class Video(Media):
    resolution: str
    bitrate: int

class Audio(Media):
    sample_rate: int
    channels: int

class MediaRepository:
    def add(self, media: Media) -> None: ...
    def get(self, uid: UUID) -> Optional[Media]: ...
    def search(self, query: str) -> list[Media]: ...

class StreamQuality:
    resolution: str
    bitrate: int

class StreamingService:
    def stream(self, media_id: UUID, quality: StreamQuality) -> bool: ...
    def pause(self, stream_id: UUID) -> None: ...
    def resume(self, stream_id: UUID) -> None: ...

class User:
    uid: UUID
    username: str
    email: str

class AuthService:
    def authenticate(self, credentials: dict) -> Optional[User]: ...
    def register(self, user_data: dict) -> Optional[User]: ...

@dataclass
class Playlist:
    uid: UUID
    name: str
    owner: User
    media_list: list[UUID]

class PlaylistService:
    def create(self, user: User, name: str) -> Playlist: ...
    def add_media(self, playlist_id: UUID, media_id: UUID) -> bool: ...
    def get_playlists(self, user: User) -> list[Playlist]: ...

@dataclass
class StreamingApp:
    media_repo: MediaRepository
    auth_service: AuthService
    streaming_service: StreamingService
    playlist_service: PlaylistService

``` 