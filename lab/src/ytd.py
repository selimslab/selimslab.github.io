#!/usr/bin/env python3
import subprocess
import sys
import os
import glob
import re
from pathlib import Path
from rich import print
from util.logs import logger

REPO_ROOT = Path(__file__).parent.parent.parent
OUTPUT_DIR = REPO_ROOT / "assets" / "static" / "music"

# Compile the regex pattern once at module level
SPECIAL_CHARS_PATTERN = re.compile(r"[\(\[\{\|]")


def download_audio(url):
    """
    Download audio from YouTube URL and convert to MP3 format
    """
    # Create output directory if it doesn't exist
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    command = [
        "yt-dlp",
        "-x",  # Extract audio
        "--audio-format",
        "mp3",
        "--audio-quality",
        "0",  # Best quality
        "-o",
        f"{OUTPUT_DIR}/%(title)s.%(ext)s",  # Output template
        url,
    ]

    try:
        subprocess.run(command, check=True)
        clean_name()
        print("done")
    except subprocess.CalledProcessError as e:
        logger.error(f"Error {url}: {e}")
    except FileNotFoundError:
        logger.error("Error: yt-dlp is not installed. Please install it first.")
        logger.error("Installation: pip install yt-dlp")
        sys.exit(1)


def clean_name():
    mp3_files = glob.glob(f"{OUTPUT_DIR}/*.mp3")
    if not mp3_files:
        return

    latest_file = max(mp3_files, key=os.path.getctime)
    # Split path and extract filename parts
    dir_path = os.path.dirname(latest_file)
    filename = os.path.basename(latest_file)
    name, ext = os.path.splitext(filename)

    # Clean the name part using the pre-compiled pattern
    clean_name = SPECIAL_CHARS_PATTERN.split(name)[0].strip()

    # Create new path with clean name and original extension
    new_path = os.path.join(dir_path, clean_name + ext)
    os.rename(latest_file, new_path)


def cli():
    print("YouTube Audio Downloader")
    print(f"Files will be saved to: {OUTPUT_DIR}")
    print("Enter YouTube URLs (or 'q' to quit)")

    while True:
        user_input = input("url or id: ")
        download_audio(user_input)


if __name__ == "__main__":
    cli()
