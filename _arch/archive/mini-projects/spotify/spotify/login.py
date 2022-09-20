import requests
import base64
import json
from spec.model import Credentials


class SpotifyLoginService:
    def authenticate(self, credentials: Credentials) -> dict:
        response_body = self._send_auth_request(credentials)
        access_token = response_body.get("access_token")
        token_type = response_body.get("token_type")
        auth_headers = {"Authorization": f"{token_type} {access_token}"}
        return auth_headers

    def _send_auth_request(self, credentials: Credentials) -> dict:
        user_string = f"{credentials.client_id}:{credentials.client_secret}"
        user_bytes = user_string.encode()
        base64_encoded_secret = base64.b64encode(user_bytes)
        headers = {
            "Authorization": "Basic " + base64_encoded_secret.decode(),
            "Content-type": "application/x-www-form-urlencoded",
        }
        body = {"grant_type": "client_credentials"}
        response = requests.post(credentials.login_url, data=body, headers=headers)
        return json.loads(response.content)
