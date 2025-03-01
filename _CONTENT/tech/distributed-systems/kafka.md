---
title: Apache Kafka
---
[Apache Kafka](https://kafka.apache.org/documentation/#design)

Kafka has a custom wire protocol. It doesn't use http, thrift, protocol buffers etc. in order to have more control 

## Kafka groups messages. 
More messages, more repetition patterns, efficient compression. 

## Don't fear the disk 

Kafka persists data immediately. Kernel keeps data in **pagecache** before flushing to disk. Kafka uses **fsync** frequently to flush pagecache to disk.  

Clusters also have an uninterruptible power supply to protect the pagecache.

## No byte-copying

Producer, broker, and consumer use the same format so they don't need to copy bytes to different formats.

Another key point is the **sendfile** system call

Sending data from disk to network normally follows the red path below. 

Kafka uses sendfile system call to directly copy from pagecache to network, following the green path 

![](/assets/static/img/kafka-sendfile.png)

