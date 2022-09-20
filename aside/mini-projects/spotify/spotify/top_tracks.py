import random
from typing import List

from spec.model import Credentials, Track

from .login import SpotifyLoginService
from .search import SpotifySearch


class SpotifyTopTracks(SpotifyLoginService, SpotifySearch):
    def __init__(self, credentials: Credentials):
        super().__init__()
        self.genres = dict()
        self.credentials = credentials
        self.auth_headers = self.authenticate(self.credentials)

    def get_random_artist_name(self, genre: str) -> str:
        try:
            artist_names = self.genres[genre]
        except KeyError as e:
            raise KeyError("genre not found")
        try:
            return random.choice(artist_names)
        except IndexError as e:
            raise IndexError("no artist found for this genre")

    def get_artist_id(self, query: str) -> str:
        search_result: dict = self.search(
            query=query, search_type="artist", auth_headers=self.auth_headers
        )
        try:
            artists = search_result.get("artists", {}).get("items", [])
            return artists[0].get("id")
        except IndexError as e:
            raise IndexError("artist id found")

    def get_top_tracks_of_a_random_artist_from_a_genre(
            self, genre: str, number_of_tracks: int = None
    ) -> List[Track]:
        if number_of_tracks is None:
            number_of_tracks = 5

        artist_name: str = self.get_random_artist_name(genre)
        artist_id = self.get_artist_id(artist_name)
        top_tracks_search_result = self.get_top_tracks_of_an_artist(
            artist_id, self.auth_headers
        )
        top_tracks: list = top_tracks_search_result.get("tracks")[:number_of_tracks]
        top_tracks_filtered = [
            Track(
                track=track.get("name"),
                artist=track.get("artists")[0].get("name"),
                release_date=track.get("album").get("release_date"),
                album_image_url=track.get("album").get("images")[0].get("url"),
            )
            for track in top_tracks
        ]
        return top_tracks_filtered
