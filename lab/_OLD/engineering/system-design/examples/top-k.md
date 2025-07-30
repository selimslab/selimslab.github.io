---
---


Design a system to find top k heavy hitters in streaming data, eg. 
Top k most played songs (Spotify)
Top k most viewed videos (YouTube)

---

Redis sorted set `ZSET` and `ZREVRANGE`

O(logn)

redis persistence

get song play in batches and update redis set 

```py

def update_top_songs():
    # Get new events since last run
    events = get_events_since(last_processed_time)
    
    # Count plays per song
    song_counts = Counter(event.song_id for event in events)
    
    # Update Redis scores
    for song_id, count in song_counts.items():
        redis.zincrby("top_songs_global", count, song_id)
    
    # Keep only top 1000 to prevent memory bloat
    redis.zremrangebyrank("top_songs_global", 0, -1001)


def get_top_k(k=10):
    return redis.zrevrange("top_songs_global", 0, k-1, withscores=True)
```

separate redis key per day 

it's possible to aggregate them to find weekly, monthly charts 

single redis instance can handle millions of items. it's also possible to shard by id in a redis cluster 

it's not real time and uses more memory than streaming

streaming like flink/kafka streams make sense if you need sub-minute latency or complex event processing 