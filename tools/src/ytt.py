from youtube_transcript_api import YouTubeTranscriptApi
import yt_dlp
import logging
from src.util.decorators import retry
from src.util.fs import write_file
from pathlib import Path

WORKSPACE_ROOT = Path(__file__).parent.parent
OUT_FILE = WORKSPACE_ROOT / ".tmp" / "ytt.md"

ytt_api = YouTubeTranscriptApi()


def get_video_title(video_url):
    try:
        ydl_opts = {"quiet": True, "no_warnings": True}
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            return info.get("title", "Unknown Title")
    except Exception as e:
        logging.error(f"Could not get title: {e}")
        return "Unknown Title"


@retry(attempts=3)
def process_video(video_id):
    raw_transcript = ytt_api.get_transcript(
        video_id, languages=["en", "en-US", "en-us", "tr"]
    )
    video_url = f"https://www.youtube.com/watch?v={video_id}"
    video_title = get_video_title(video_url)
    frontmatter = f"---\ntitle: {video_title}\nurl: {video_url}\n---"
    transcript = f"{frontmatter}\n\n{'\n'.join(t['text'] for t in raw_transcript)}"
    write_file(OUT_FILE, transcript)
    print(f"ok: {video_title}")


def cli():
    while True:
        user_input = input("yt transcript - url or id: ").strip()
        video_id = (
            user_input.split("v=")[-1].split("&")[0]
            if "youtube.com" in user_input
            else user_input
        )

        process_video(video_id)


if __name__ == "__main__":
    cli()
