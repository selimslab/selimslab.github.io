# Chapter 9: Design a Web Crawler

## Problem Understanding and Scale

**Use cases:**
- Search engine indexing
- Web mining for financial analysis
- Web monitoring for copyright/trademark infringement

**Requirements:**
- 1 billion pages per month
- HTML content only
- Handle newly added/edited pages
- Store data for 5 years
- Ignore duplicate content

**Back-of-envelope estimation:**
- QPS: 1 billion ÷ 30 days ÷ 24 hours ÷ 3600 seconds = ~400 pages/second
- Peak QPS: 2 × 400 = 800 pages/second
- Storage: 1 billion × 500KB = 500 TB per month
- 5-year storage: 500 TB × 12 months × 5 years = 30 PB

## High-Level Design Components

### Seed URLs
- Starting point for crawl process
- Strategy: divide URL space by locality (countries) or topics (shopping, sports, healthcare)
- University example: use domain name as seed

### URL Frontier
- FIFO queue storing URLs to be downloaded
- Split crawl state: to be downloaded vs already downloaded
- Manages politeness, prioritization, and freshness

### HTML Downloader
- Downloads web pages using HTTP protocol
- Calls DNS Resolver for IP address translation
- Example: www.wikipedia.org → 198.35.26.96

### DNS Resolver
- Translates URLs to IP addresses
- Critical for download process

### Content Parser
- Validates downloaded web pages
- Separate component to avoid slowing crawl process
- Handles malformed pages

### Content Seen?
- Eliminates duplicate content (29% of web pages are duplicates)
- Uses hash comparison instead of character-by-character
- Prevents storing same content multiple times

### Content Storage
- Stores HTML content
- Hybrid approach: disk for capacity, memory for popular content
- Balances storage capacity with access speed

### URL Extractor
- Parses and extracts links from HTML pages
- Converts relative paths to absolute URLs
- Example: adds "https://en.wikipedia.org" prefix

### URL Filter
- Excludes unwanted content types, file extensions, error links
- Maintains blacklisted sites
- Prevents crawling inappropriate content

### URL Seen?
- Tracks visited URLs and URLs in frontier
- Prevents infinite loops and duplicate processing
- Implemented using Bloom filter or hash table

### URL Storage
- Stores already visited URLs
- Maintains crawl history

## Crawler Workflow

1. Add seed URLs to URL Frontier
2. HTML Downloader fetches URLs from frontier
3. Get IP addresses from DNS resolver and download
4. Content Parser validates HTML pages
5. Pass to "Content Seen?" component
6. If not seen before, pass to Link Extractor
7. Extract links from HTML pages
8. Filter extracted links
9. Check "URL Seen?" component
10. If URL not processed before, add to URL Frontier
11. Repeat process

## Deep Dive Topics

### DFS vs BFS
- **DFS problems:** Can go very deep, not suitable for web crawling
- **BFS preferred:** Implemented with FIFO queue
- **Standard BFS issues:**
  - Many links from same host (impoliteness)
  - No URL prioritization

### URL Frontier Advanced Design

**Politeness management:**
- Download one page at a time per host
- Add delays between downloads from same host
- Queue router ensures each queue contains URLs from same host
- Worker threads mapped to specific queues

**Priority management:**
- Prioritize based on PageRank, traffic, update frequency
- Front queues manage prioritization
- Back queues manage politeness
- Queue selector chooses high-priority queues with bias

**Freshness optimization:**
- Recrawl based on update history
- Prioritize important pages for frequent recrawling
- Balance freshness with resource consumption

**Storage optimization:**
- Hybrid approach: majority on disk, buffers in memory
- Periodic writing to disk
- Hundreds of millions of URLs in frontier

### HTML Downloader Optimization

**Robots.txt compliance:**
- Check robots.txt before crawling
- Cache results to avoid repeated downloads
- Follow exclusion rules

**Performance optimizations:**
1. **Distributed crawl:** Multiple servers, multiple threads per server
2. **DNS cache:** Avoid 10-200ms DNS lookup delays
3. **Locality:** Geographically distributed crawl servers
4. **Short timeouts:** Avoid waiting for slow/unresponsive servers

### Robustness Measures

- **Consistent hashing:** Distribute loads, handle server changes
- **Save crawl states:** Resume from failures
- **Exception handling:** Graceful error management
- **Data validation:** Prevent system errors

### Extensibility

- Plugin architecture for new content types
- PNG Downloader module for images
- Web Monitor module for copyright monitoring
- Modular design supports future enhancements

### Problematic Content Detection

**Redundant content:**
- 30% of web pages are duplicates
- Use hashes/checksums for detection

**Spider traps:**
- Infinite loop situations
- Example: www.site.com/foo/bar/foo/bar/foo/bar/...
- Solutions: Maximum URL length, manual verification

**Data noise:**
- Advertisements, code snippets, spam URLs
- Anti-spam components filter low-quality content

## Additional Considerations

**Server-side rendering:**
- Handle JavaScript/AJAX generated links
- Dynamic rendering before parsing

**Database design:**
- Replication and sharding for availability
- Horizontal scaling for large-scale crawls

**System characteristics:**
- Availability, consistency, reliability
- Analytics for system fine-tuning
- Stateless server design

## Key Design Principles

1. **Scalability:** Handle billions of pages with parallelization
2. **Robustness:** Handle bad HTML, unresponsive servers, malicious links
3. **Politeness:** Avoid overwhelming servers with requests
4. **Extensibility:** Minimal changes for new content types

The web crawler design balances efficiency, politeness, and robustness while handling massive scale and various edge cases encountered in real-world web crawling.