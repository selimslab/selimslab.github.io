import requests
import json


class SpotifySearch:
    @staticmethod
    def search(query: str, search_type: str, auth_headers: dict) -> dict:
        url = "https://api.spotify.com/v1/search"
        url += "?q=" + query + "&type=" + search_type + "&limit=1"
        response = requests.get(url, headers=auth_headers)
        return json.loads(response.content)

    @staticmethod
    def get_top_tracks_of_an_artist(artist_id: str, auth_headers: dict) -> dict:
        url = (
                "https://api.spotify.com/v1/artists/" + artist_id + "/top-tracks?market=tr"
        )
        r = requests.get(url, headers=auth_headers)
        return json.loads(r.content)
