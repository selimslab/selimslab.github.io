from airforce import __version__

from airforce import start_tracking

def test_version():
    assert __version__ == '0.1.0'

if __name__ == "__main__":
    start_tracking()