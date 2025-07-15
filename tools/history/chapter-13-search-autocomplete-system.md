# Chapter 13: Design a Search Autocomplete System

## Overview

Search autocomplete (also called typeahead, search-as-you-type, or incremental search) presents matching suggestions as users type in a search box. This system is crucial for improving user experience in search engines, e-commerce platforms, and applications.

## Requirements and Scale

### Functional Requirements
- **Matching**: Only at the beginning of search queries (not middle)
- **Suggestions**: Return 5 autocomplete suggestions
- **Ranking**: Determined by historical query frequency (popularity)
- **Language**: English only (with potential multi-language support)
- **Characters**: Lowercase alphabetic characters only (no special characters)
- **Response Time**: Results within 100ms to avoid stuttering

### Non-Functional Requirements
- **Scalability**: Handle high traffic volume
- **Availability**: Remain accessible during partial system failures
- **Relevance**: Suggestions relevant to search terms
- **Sorting**: Results sorted by popularity or ranking models

### Scale Estimations
- **Users**: 10 million DAU
- **Searches**: 10 searches per user per day
- **Query Length**: 20 bytes per query (4 words × 5 characters)
- **Requests**: 20 requests per search query (one per character typed)
- **QPS**: ~24,000 QPS (10M users × 10 queries × 20 requests / 86,400 seconds)
- **Peak QPS**: ~48,000 QPS
- **New Data**: 0.4 GB daily (20% of queries are new)

## High-Level Design

### Two Main Services

#### 1. Data Gathering Service
- **Purpose**: Collect and aggregate user input queries
- **Initial Approach**: Real-time processing (not practical for large scale)
- **Improved Approach**: Batch processing with regular updates

#### 2. Query Service
- **Purpose**: Return top 5 most frequent search terms for given prefix
- **Initial Approach**: Direct database query
- **Improved Approach**: Optimized with caching and trie data structure

### Simple Frequency Table Approach
- **Storage**: Query string and frequency
- **Update**: Increment frequency for each query
- **Retrieval**: SQL query for top 5 results with matching prefix
- **Limitation**: Database becomes bottleneck for large datasets

## Deep Dive: Trie Data Structure

### Why Trie?
- **Efficiency**: Faster than relational database for prefix searches
- **Compactness**: Efficiently stores strings with shared prefixes
- **Retrieval**: Optimized for string retrieval operations

### Basic Trie Structure
- **Root**: Represents empty string
- **Nodes**: Store characters with up to 26 children (a-z)
- **Paths**: Each path represents a word or prefix
- **Frequency**: Added to nodes to support popularity sorting

### Trie Operations Algorithm
1. **Find Prefix**: Traverse to prefix node - O(p) where p = prefix length
2. **Get Valid Children**: Traverse subtree from prefix node - O(c) where c = children count
3. **Sort and Return Top K**: Sort by frequency - O(c log c)

**Total Time Complexity**: O(p) + O(c) + O(c log c)

### Optimizations

#### 1. Limit Max Prefix Length
- **Rationale**: Users rarely type long queries
- **Implementation**: Limit prefix to 50 characters
- **Result**: Reduces O(p) to O(1)

#### 2. Cache Top Queries at Each Node
- **Approach**: Store top k queries at every node
- **Trade-off**: Space for time (worth it for fast response)
- **Result**: Reduces retrieval to O(1)
- **Final Complexity**: O(1) overall

### Optimized Trie Structure
- Each node stores:
  - Character
  - Frequency
  - Top k cached queries
  - Children pointers

## Data Gathering Service (Improved)

### Components

#### 1. Analytics Logs
- **Storage**: Raw search query data
- **Format**: Append-only, not indexed
- **Fields**: Query, timestamp, user info

#### 2. Aggregators
- **Purpose**: Process raw logs into usable format
- **Frequency**: 
  - Real-time apps (Twitter): Short intervals
  - General use: Weekly aggregation
- **Output**: Aggregated frequency data

#### 3. Workers
- **Function**: Asynchronous jobs at regular intervals
- **Task**: Build trie from aggregated data
- **Storage**: Store trie in Trie DB

#### 4. Trie Cache
- **Type**: Distributed cache system
- **Purpose**: Keep trie in memory for fast reads
- **Update**: Weekly snapshots from DB

#### 5. Trie DB (Persistent Storage)

**Option 1: Document Store**
- **Approach**: Serialize trie weekly, store in MongoDB
- **Benefits**: Good for serialized data
- **Use Case**: Complete trie replacement

**Option 2: Key-Value Store**
- **Approach**: Map trie to hash table
- **Mapping**: 
  - Prefix → Key
  - Node data → Value
- **Benefits**: Flexible updates

## Query Service (Improved)

### Architecture Flow
1. **Load Balancer**: Route requests to API servers
2. **API Servers**: Get trie data from Trie Cache
3. **Trie Cache**: Serve cached autocomplete data
4. **Cache Miss**: Replenish from Trie DB

### Performance Optimizations

#### 1. AJAX Requests
- **Benefit**: No full page refresh
- **Implementation**: Asynchronous JavaScript calls
- **Result**: Smooth user experience

#### 2. Browser Caching
- **Rationale**: Suggestions don't change frequently
- **Implementation**: Cache-Control headers
- **Example**: Google caches for 1 hour (max-age=3600)
- **Privacy**: private cache (not shared)

#### 3. Data Sampling
- **Problem**: Logging every query is expensive
- **Solution**: Sample 1 out of N requests
- **Benefit**: Reduces processing power and storage

## Trie Operations

### Create
- **Process**: Workers build trie from aggregated data
- **Source**: Analytics logs/DB
- **Frequency**: Weekly or as needed

### Update
**Option 1: Weekly Replacement**
- Replace entire trie weekly
- Simple but less responsive to trends

**Option 2: Node-Level Updates**
- Update individual nodes directly
- Slower but more responsive
- **Challenge**: Must update all ancestors (they store top queries)

### Delete
- **Need**: Remove inappropriate content (hate speech, violence, etc.)
- **Implementation**: Filter layer before Trie Cache
- **Process**: 
  1. Real-time filtering
  2. Asynchronous database cleanup
  3. Clean data used in next trie build

## Scaling Storage

### Sharding Strategy

#### First-Level Sharding
- **Approach**: Shard by first character
- **Capacity**: Up to 26 servers (a-z)
- **Problem**: Uneven distribution (more 'c' words than 'x')

#### Multi-Level Sharding
- **Approach**: Shard by first, second, or third character
- **Example**: 'a' → 'aa-ag', 'ah-an', 'ao-au', 'av-az'

#### Smart Sharding
- **Solution**: Analyze historical data patterns
- **Implementation**: Shard map manager
- **Example**: 's' gets own shard, 'u-z' shares another
- **Benefit**: Balanced distribution

### Shard Map Manager
- **Purpose**: Maintain lookup database for shard routing
- **Function**: Determine which server stores which data
- **Flexibility**: Adjust sharding based on data distribution

## Advanced Features

### Multi-Language Support
- **Implementation**: Use Unicode characters in trie nodes
- **Challenge**: Different character sets and alphabets
- **Solution**: Unicode encoding standard

### Geographic Customization
- **Problem**: Different popular queries per country
- **Solution**: Build separate tries per country
- **Optimization**: Store tries in CDNs for better response time

### Real-Time/Trending Queries
- **Challenge**: Handle sudden popularity spikes
- **Problems with Current Design**:
  - Weekly updates too slow
  - Trie building takes too long

**Solutions**:
- **Reduce Dataset**: Shard data more aggressively
- **Ranking Model**: Weight recent queries more heavily
- **Stream Processing**: Use Apache Kafka, Storm, Spark Streaming
- **Real-Time Updates**: Build incremental update system

## Key Technical Insights

### Data Structure Choice
- **Trie Benefits**: Optimized for prefix searches
- **Caching Strategy**: Trade space for time
- **Optimization**: Constant time retrieval through pre-computation

### Scalability Patterns
- **Horizontal Sharding**: Distribute data across servers
- **Intelligent Sharding**: Balance load based on data patterns
- **Caching Layers**: Multiple levels of caching

### Performance Optimization
- **Response Time**: Critical 100ms threshold
- **Browser Caching**: Leverage client-side storage
- **Data Sampling**: Reduce system load
- **AJAX**: Smooth user experience

### System Architecture
- **Batch Processing**: Separate data gathering from serving
- **Cache-First**: Prioritize read performance
- **Fault Tolerance**: Multiple storage options and fallbacks

The search autocomplete system demonstrates how to build a high-performance, scalable system that provides instant feedback to users while handling massive query volumes through intelligent data structures, caching strategies, and distributed architecture.