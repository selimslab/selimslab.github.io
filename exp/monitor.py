import requests
import time
import subprocess

def notify(title: str, message: str):
    subprocess.run([
        "osascript", 
        "-e", f'display notification "{message}" with title "{title}"'
    ])

def monitor_url(url: str, check_interval: int):
    while True:
        try:
            response = requests.get(url)
            if response.status_code == 200:
                notify(
                    title="URL Available",
                    message=f"The URL {url} is now available (Status: 200)."
                )
                print(f"Notification sent. URL {url} is available.")
                break
            else:
                print(f"Checked {url}, status code: {response.status_code}. Retrying...")
        except requests.RequestException as e:
            print(f"Error checking URL {url}: {e}. Retrying...")
        
        time.sleep(check_interval)

# Configuration
url_to_check = "https://web.flypgs.com/booking?adultCount=2&arrivalPort=SAW&currency=TL&dateOption=1&departureDate=2025-01-23&departurePort=PRG&language=tr&returnDate=2025-02-10"
check_interval_seconds = 10

# Start monitoring
monitor_url(url_to_check, check_interval_seconds)
