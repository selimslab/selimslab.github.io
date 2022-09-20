import os
from spec.model import Credentials
from dotenv import load_dotenv

load_dotenv()

spotify_credentials = Credentials(
    login_url="https://accounts.spotify.com/api/token",
    client_id=os.getenv("CLIENT_ID"),
    client_secret=os.getenv("CLIENT_SECRET"),
)

if __name__ == "__main__":
    pass
