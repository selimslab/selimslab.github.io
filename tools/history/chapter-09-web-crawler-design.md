# Chapter 9: Design a Web Crawler

## Overview

A web crawler is a system that systematically browses the internet to download web pages. It's used for search engine indexing, data mining, and web monitoring. The basic algorithm involves downloading web pages, extracting URLs from them, and repeating the process.

## Requirements and Scale

### Functional Requirements
- **Purpose**: Search engine indexing
- **Scale**: 1 billion pages per month
- **Content**: HTML only
- **Storage**: 5 years retention
- **Duplicate handling**: Ignore duplicate content
- **Freshness**: Handle newly added/edited pages

### Scale Calculations
- **QPS**: 1 billion pages / 30 days / 24 hours / 3600 seconds = ~400 pages/second
- **Peak QPS**: 800 pages/second
- **Storage**: 500KB average page size × 1 billion pages = 500 TB/month
- **5-year storage**: 500 TB × 12 months × 5 years = 30 PB

### Key Characteristics
- **Scalability**: Handle billions of pages using parallelization
- **Robustness**: Handle bad HTML, unresponsive servers, malicious links
- **Politeness**: Avoid overwhelming servers with too many requests
- **Extensibility**: Support new content types with minimal changes

## High-Level Architecture

### Core Components

#### 1. Seed URLs
- Starting points for crawling
- Selection strategies:
  - **Locality-based**: Different countries have different popular sites
  - **Topic-based**: Divide by categories (shopping, sports, healthcare)

#### 2. URL Frontier
- FIFO queue storing URLs to be downloaded
- Manages crawl state (to be downloaded vs already downloaded)
- Handles politeness and prioritization

#### 3. HTML Downloader
- Downloads web pages using HTTP protocol
- Translates URLs to IP addresses via DNS Resolver
- Example: www.wikipedia.org → 198.35.26.96

#### 4. Content Parser
- Parses and validates downloaded pages
- Separate component to avoid slowing crawler
- Handles malformed pages

#### 5. Content Seen?
- Eliminates duplicate content (29% of web pages are duplicates)
- Uses hash values for efficient comparison
- Avoids character-by-character comparison

#### 6. Content Storage
- Hybrid storage approach:
  - **Disk**: Most content (too big for memory)
  - **Memory**: Popular content (reduced latency)

#### 7. URL Extractor
- Parses HTML and extracts links
- Converts relative paths to absolute URLs
- Example: Adds "https://en.wikipedia.org" prefix

#### 8. URL Filter
- Excludes unwanted content types, file extensions
- Filters error links and blacklisted sites

#### 9. URL Seen?
- Tracks visited URLs to avoid duplicates
- Prevents infinite loops and reduces server load
- Implemented using Bloom filters or hash tables

#### 10. URL Storage
- Stores already visited URLs

## Crawler Workflow

1. **Add seed URLs** to URL Frontier
2. **HTML Downloader** fetches URLs from Frontier
3. **DNS resolution** converts URLs to IP addresses
4. **Content Parser** validates downloaded pages
5. **Content Seen check** eliminates duplicates
6. **Link Extractor** extracts URLs from valid pages
7. **URL Filter** removes unwanted URLs
8. **URL Seen check** prevents duplicate processing
9. **Add new URLs** to Frontier

## Deep Dive: Critical Components

### DFS vs BFS
- **DFS Problem**: Can go very deep, inefficient for web crawling
- **BFS Solution**: Uses FIFO queue, but has issues:
  - Same-host flooding (impolite)
  - No URL prioritization

### URL Frontier Design

#### Politeness Management
- **Problem**: Too many requests to same host
- **Solution**: 
  - One download thread per host
  - Separate FIFO queue per host
  - Delay between downloads from same host

**Components**:
- **Queue Router**: Ensures each queue contains URLs from same host
- **Mapping Table**: Maps hosts to queues
- **FIFO Queues**: One per host
- **Queue Selector**: Maps worker threads to queues
- **Worker Threads**: Download pages with delays

#### Priority Management
- **Need**: Important pages (Apple homepage) vs forum posts
- **Metrics**: PageRank, website traffic, update frequency
- **Components**:
  - **Prioritizer**: Computes URL priorities
  - **Priority Queues**: Different priority levels
  - **Biased Selection**: Higher priority queues chosen more often

#### Freshness Management
- **Strategies**:
  - Recrawl based on update history
  - Prioritize important pages for frequent recrawling

#### Storage Strategy
- **Challenge**: Hundreds of millions of URLs
- **Solution**: Hybrid approach
  - Majority on disk (space efficiency)
  - Memory buffers for enqueue/dequeue operations
  - Periodic disk writes

### HTML Downloader Optimizations

#### Robots.txt Protocol
- Standard for crawler permissions
- Specifies allowed/disallowed pages
- Cache results to avoid repeated downloads
- Example from Amazon: Disallow /creatorhub/* for Googlebot

#### Performance Optimizations

1. **Distributed Crawling**
   - Multiple servers with multiple threads
   - Partition URL space across servers

2. **DNS Caching**
   - DNS requests: 10ms-200ms response time
   - Cache domain-to-IP mappings
   - Update periodically via cron jobs

3. **Geographic Distribution**
   - Crawl servers closer to target hosts
   - Applies to all components: servers, cache, queues, storage

4. **Timeout Management**
   - Set maximum wait times
   - Avoid blocking on slow/unresponsive servers

### Robustness Strategies

1. **Consistent Hashing**: Distribute load among downloaders
2. **State Persistence**: Save crawl states and data for recovery
3. **Exception Handling**: Graceful error handling without crashes
4. **Data Validation**: Prevent system errors

### Extensibility Design

- **Modular Architecture**: Plug-in new modules
- **Examples**:
  - PNG Downloader for image files
  - Web Monitor for copyright infringement

### Problematic Content Detection

#### 1. Redundant Content
- 30% of web pages are duplicates
- Use hashes/checksums for detection

#### 2. Spider Traps
- Infinite loop scenarios
- Example: www.example.com/foo/bar/foo/bar/foo/bar/...
- **Solutions**:
  - Set maximum URL length
  - Manual verification and custom filters
  - Detect unusually large page counts

#### 3. Data Noise
- Low-value content: ads, code snippets, spam
- Filter out when possible

## Additional Considerations

### Advanced Topics Not Covered in Detail

1. **Server-side Rendering**: Handle JavaScript-generated links
2. **Anti-spam Filtering**: Remove low-quality pages
3. **Database Replication/Sharding**: Improve availability and scalability
4. **Horizontal Scaling**: Stateless servers for large-scale crawling
5. **Availability, Consistency, Reliability**: Core system principles
6. **Analytics**: Data collection for system tuning

## Key Technical Insights

- **Scale Challenge**: Crawling billions of pages requires sophisticated parallelization
- **Politeness is Critical**: Respect server resources and robots.txt
- **Duplicate Detection**: 29% duplicate content requires efficient hash-based detection
- **Storage Hybrid**: Balance between disk space and memory speed
- **Geographic Distribution**: Locality improves performance significantly
- **Modular Design**: Extensibility essential for evolving requirements

The web crawler design demonstrates how to build a scalable, robust system that respects web servers while efficiently processing massive amounts of data. The key is balancing performance, politeness, and reliability through careful component design and optimization strategies.