---
---

```py

class AuthMethod(Enum):
    PASSWORD = auto()
    TWOFACTOR = auto()
    BIOMETRIC = auto()
    OAUTH = auto()


@dataclass
class PasswordAuthenticator:
    username: str
    hashed_password: str  # Store hashed password instead of plain text password

    @staticmethod
    def hash_password(password: str) -> str:
        # Hash the password using a secure hash function (e.g., SHA-256)
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        return hashed_password

    def set_password(self, password: str):
        # Hash and store the password
        self.hashed_password = self.hash_password(password)

    def authenticate(self, entered_password: str) -> bool:
        # Hash the entered password and compare with stored hashed password
        entered_password_hashed = self.hash_password(entered_password)
        return self.hashed_password == entered_password_hashed


@dataclass
class TwoFactorAuthenticator:
    username: str
    hashed_password: str
    is_2fa_enabled: bool = False
    auth_code: str = ""

    def enable_2fa(self):
        # Enable 2FA and generate a random authentication code
        self.is_2fa_enabled = True
        self.auth_code = str(random.randint(1000, 9999))  # Generate a 4-digit authentication code

    def disable_2fa(self):
        # Disable 2FA and reset the authentication code
        self.is_2fa_enabled = False
        self.auth_code = ""

    def generate_new_auth_code(self):
        # Generate a new 4-digit authentication code
        self.auth_code = str(random.randint(1000, 9999))

    def verify_auth_code(self, entered_code: str) -> bool:
        # Verify the entered authentication code
        return self.auth_code == entered_code


@dataclass
class BiometricAuthenticator:
    biometric_data: bytes  # Biometric data (e.g., fingerprint template, facial features) stored as bytes


```