from youtube_transcript_api import YouTubeTranscriptApi
import yt_dlp
from util.decors import retry
from util.fs import write_file
from util.logs import logger
from pathlib import Path
from rich import print
import re

OUTPUT_DIR = Path(__file__).parent.parent / ".tmp" 

ytt_api = YouTubeTranscriptApi()

def get_video_title(video_url):
    try:
        ydl_opts = {"quiet": True, "no_warnings": True}
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            return info.get("title", "Unknown Title")
    except Exception as e:
        logger.error(f"Could not get title: {e}")
        return "Unknown Title"


def get_playlist_video_ids(playlist_url):
    """Extract all video IDs from a YouTube playlist"""
    try:
        ydl_opts = {
            "quiet": True, 
            "no_warnings": True,
            "extract_flat": True,  # Only extract video info, don't download
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(playlist_url, download=False)
            if 'entries' in info:
                video_ids = [entry['id'] for entry in info['entries'] if entry.get('id')]
                return video_ids
            return []
    except Exception as e:
        logger.error(f"Could not extract playlist: {e}")
        return []


def format_transcript_sentences(raw_transcript):
    joined = ' '.join(t['text'] for t in raw_transcript)
    normalized = re.sub(r'\s+', ' ', joined)
    splitted = re.split(r'[.!?]', normalized)
    dotted = [sentence.strip() + '.' for sentence in splitted if sentence.strip()]
    return '\n'.join(dotted)
    

@retry(attempts=3)
def get_transcript(video_id):
    raw_transcript = ytt_api.get_transcript(
        video_id, languages=["en", "en-US", "en-us", "tr"]
    )
    video_url = f"https://www.youtube.com/watch?v={video_id}"
    video_title = get_video_title(video_url)
    frontmatter = f"---\ntitle: {video_title}\nurl: {video_url}\n---"
    
    formatted_sentences = format_transcript_sentences(raw_transcript)
    transcript = f"{frontmatter}\n\n{formatted_sentences}"
    return video_title, transcript


def process_single_video(video_id):
    """Process a single video and save its transcript"""
    try:
        video_title, transcript = get_transcript(video_id)
        filepath = OUTPUT_DIR / f"{video_title}.md"
        write_file(filepath, transcript)
        print(f"✅ {video_title} -> {filepath}")
        return True
    except Exception as e:
        logger.error(f"Failed to process video {video_id}: {e}")
        print(f"❌ Failed to process video {video_id}: {e}")
        return False


def cli():
    while True:
        user_input = input("yt transcript - video/playlist url or id: ").strip()
        
        # Check if it's a playlist URL
        if "playlist?list=" in user_input:
            print(f"🔍 Detected playlist, extracting video IDs...")
            video_ids = get_playlist_video_ids(user_input)
            
            if not video_ids:
                print("❌ No videos found in playlist")
                continue
                
            print(f"📋 Found {len(video_ids)} videos in playlist")
            
            success_count = 0
            for i, video_id in enumerate(video_ids, 1):
                print(f"📹 Processing video {i}/{len(video_ids)}: {video_id}")
                if process_single_video(video_id):
                    success_count += 1
            
            print(f"✨ Processed {success_count}/{len(video_ids)} videos successfully")
            
        else:
            # Single video processing (existing logic)
            video_id = (
                user_input.split("v=")[-1].split("&")[0]
                if "youtube.com" in user_input
                else user_input
            )
            process_single_video(video_id)


if __name__ == "__main__":
    cli()
