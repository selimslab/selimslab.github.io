---
title: Design an OAuth System 
---

```py
from dataclasses import dataclass
from typing import Dict, Optional, Tuple
from urllib.parse import urlparse, parse_qs

ClientID = str
ClientSecret = str
RedirectURI = str
UserID = str
AuthorizationCode = str
AccessToken = str

@dataclass
class OAuthClient:
    client_id: ClientID
    client_secret: ClientSecret
    redirect_uri: RedirectURI

@dataclass
class OAuthUser:
    user_id: UserID
    username: str

class OAuthServer:
    def __init__(self):
        self.clients: Dict[ClientID, OAuthClient] = {}
        self.users: Dict[UserID, OAuthUser] = {}
        self.authorization_codes: Dict[AuthorizationCode, Tuple[ClientID, RedirectURI]] = {}  # Map authorization code to client ID and redirect URI
        self.access_tokens: Dict[ClientID, AccessToken] = {}  # Store access tokens

    def register_client(self, client: OAuthClient):
        self.clients[client.client_id] = client

    def register_user(self, user: OAuthUser):
        self.users[user.user_id] = user

    def generate_authorization_code(self, client_id: ClientID, user_id: UserID, redirect_uri: RedirectURI) -> AuthorizationCode:
        authorization_code = "generated_authorization_code"  # Implement logic to generate authorization code
        self.authorization_codes[authorization_code] = (client_id, redirect_uri)  # Store authorization code with client ID and redirect URI
        return authorization_code

    def exchange_authorization_code_for_access_token(self, client_id: ClientID, client_secret: ClientSecret, authorization_code: AuthorizationCode) -> Optional[AccessToken]:
        stored_client_id, redirect_uri = self.authorization_codes.get(authorization_code, (None, None))
        if stored_client_id == client_id:
            access_token = "generated_access_token"  # Implement logic to generate access token
            # for example, secrets.token_urlsafe(length)
            self.access_tokens[client_id] = access_token  # Store access token
            return access_token, redirect_uri
        return None, None

class OAuthClientApp:
    def __init__(self, client: OAuthClient):
        self.client = client

    def request_authorization(self, user_id: UserID) -> str:
        redirect_uri = self.client.redirect_uri
        authorization_code = oauth_server.generate_authorization_code(self.client.client_id, user_id, redirect_uri)
        return f"{redirect_uri}?code={authorization_code}"

    def handle_redirect_response(self, redirect_url: str) -> Tuple[Optional[AuthorizationCode], Optional[RedirectURI]]:
        parsed_url = urlparse(redirect_url)
        query_params = parse_qs(parsed_url.query)
        authorization_code = query_params.get('code', [None])[0]
        redirect_uri = query_params.get('redirect_uri', [None])[0]
        return authorization_code, redirect_uri

    def request_access_token(self, authorization_code: AuthorizationCode, redirect_uri: RedirectURI) -> Optional[AccessToken]:
        client_id = self.client.client_id
        client_secret = self.client.client_secret
        access_token, stored_redirect_uri = oauth_server.exchange_authorization_code_for_access_token(client_id, client_secret, authorization_code)
        if stored_redirect_uri == redirect_uri:
            return access_token
        return None

oauth_server = OAuthServer()
client = OAuthClient("client_id", "client_secret", "https://client.example.com/callback")
oauth_server.register_client(client)
user = OAuthUser("user_id", "username")
oauth_server.register_user(user)

client_app = OAuthClientApp(client)

# Step 1: User Authorization Request
authorization_url = client_app.request_authorization("user_id")
print(f"Redirect the user to: {authorization_url}")

# Step 2: Client Handles Redirect and Extracts Authorization Code
redirect_url = "https://client.example.com/callback?code=generated_authorization_code&redirect_uri=https://client.example.com/callback"
authorization_code, redirect_uri = client_app.handle_redirect_response(redirect_url)

# Step 3: Client Requests Access Token Using Authorization Code and Redirect URI
access_token = client_app.request_access_token(authorization_code, redirect_uri)
if access_token:
    print(f"Received access token: {access_token}")
else:
    print("Invalid authorization code or redirect URI")


```