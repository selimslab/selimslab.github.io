#!/usr/bin/env -S uv run --script
# /// script
# dependencies = ["youtube_transcript_api", "requests"]
# ///

from youtube_transcript_api import YouTubeTranscriptApi
import logging

OUT_FILE = ".tmp.txt"

def process_video(video_id, attempts=0):
    try:
        raw_transcript = YouTubeTranscriptApi.get_transcript(
            video_id, languages=["en", "tr"]
        )
        transcript = "\n".join(t["text"] for t in raw_transcript)
        with open(OUT_FILE, "w", encoding="utf-8") as f:
            f.write(transcript)
        print("ok")
    except Exception as e:
        logging.error(str(e))
        if attempts < 2:
            process_video(video_id, attempts + 1)

def cli():
    while True:
        user_input = input("\nyoutube url or video id: ").strip()
        video_id = (
            user_input.split("v=")[-1].split("&")[0]
            if "youtube.com" in user_input
            else user_input
        )

        if not video_id:
            print("try again")
            continue

        process_video(video_id)

if __name__ == "__main__":
    cli()