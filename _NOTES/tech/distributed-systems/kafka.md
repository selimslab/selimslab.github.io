---
title: Apache Kafka
---
[Apache Kafka](https://kafka.apache.org/documentation/#design)

wire protocol 

doesn't use http, thrift, protocol buffers etc. in order to have more control 

**pagecache & sendfile** 

frequent fsync + uninterruptible power supply 

Kafka groups the messages. More messages, more repetition patterns, efficient compression. 

No byte-copying. Producer, broker, and consumer use the same format so they don't need to copy bytes to different formats.
