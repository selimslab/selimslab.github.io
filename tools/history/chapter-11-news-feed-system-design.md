# Chapter 11: Design a News Feed System

## Overview

A news feed system displays a constantly updating list of stories including status updates, photos, videos, links, and activities from friends, pages, and groups. This is commonly seen in Facebook, Instagram, and Twitter feeds.

## Requirements and Scale

### Functional Requirements
- **Platform**: Both mobile app and web app
- **Core Features**: Users can publish posts and see friends' posts
- **Sorting**: Reverse chronological order
- **Friend Limit**: 5,000 friends per user
- **Content Types**: Text, images, and videos
- **Daily Active Users**: 10 million DAU

### System Characteristics
- **Two Main Flows**:
  1. **Feed Publishing**: User publishes post, data written to cache/database, populated to friends' feeds
  2. **News Feed Building**: Aggregate friends' posts in reverse chronological order

## API Design

### Feed Publishing API
```
POST /v1/me/feed
Params:
- content: text of the post
- auth_token: authentication token
```

### News Feed Retrieval API
```
GET /v1/me/feed
Params:
- auth_token: authentication token
```

## High-Level Architecture

### Feed Publishing Flow
1. **User**: Makes post via API call
2. **Load Balancer**: Distributes traffic to web servers
3. **Web Servers**: Route traffic to internal services
4. **Post Service**: Persist post in database and cache
5. **Fanout Service**: Push new content to friends' news feeds
6. **Notification Service**: Inform friends and send push notifications

### News Feed Building Flow
1. **User**: Sends request to retrieve news feed
2. **Load Balancer**: Routes to web servers
3. **Web Servers**: Route to news feed service
4. **News Feed Service**: Fetches feed from cache
5. **News Feed Cache**: Stores news feed IDs for rendering

## Deep Dive: Feed Publishing

### Web Servers
- **Authentication**: Only users with valid auth_token can post
- **Rate Limiting**: Prevents spam and abusive content
- **Traffic Routing**: Direct requests to appropriate services

### Fanout Service

#### Fanout Models

**Fanout on Write (Push Model)**:
- **Process**: News feed pre-computed during write time
- **Pros**:
  - Real-time news feed generation
  - Fast retrieval (pre-computed)
- **Cons**:
  - Hotkey problem (users with many friends)
  - Wasted resources for inactive users

**Fanout on Read (Pull Model)**:
- **Process**: News feed generated during read time
- **Pros**:
  - No wasted resources for inactive users
  - No hotkey problem
- **Cons**:
  - Slow fetching (not pre-computed)

#### Hybrid Approach
- **Majority of Users**: Push model for fast retrieval
- **Celebrities/High-follower Users**: Pull model to avoid system overload
- **Hotkey Mitigation**: Consistent hashing for even distribution

### Fanout Service Workflow
1. **Fetch Friend IDs**: From graph database (optimized for friend relationships)
2. **Get Friends Info**: From user cache, apply filters (muted users, privacy settings)
3. **Send to Message Queue**: Friends list and new post ID
4. **Fanout Workers**: Process queue, store in news feed cache
5. **Store Mapping**: `<post_id, user_id>` in news feed cache

### News Feed Cache Design
- **Storage**: Only IDs stored (not full objects) to minimize memory
- **Limit**: Configurable limit (users rarely scroll through thousands of posts)
- **Structure**: Mapping table format for efficient access

## Deep Dive: News Feed Retrieval

### Retrieval Workflow
1. **User Request**: `/v1/me/feed`
2. **Load Balancer**: Redistribute to web servers
3. **Web Servers**: Call news feed service
4. **News Feed Service**: Get post IDs from cache
5. **Data Hydration**: Fetch complete user and post objects from caches
6. **Response**: Return fully hydrated feed in JSON format

### Media Content
- **CDN Storage**: Images and videos stored in CDN for fast retrieval
- **Separation**: Media content separated from text content

## Cache Architecture

### Five-Layer Cache Design
1. **News Feed Cache**: Stores IDs of news feeds
2. **Content Cache**: Stores post data (popular content in hot cache)
3. **Social Graph Cache**: Stores user relationship data
4. **Action Cache**: Stores user actions (likes, replies, etc.)
5. **Counters Cache**: Stores metrics (like count, reply count, followers, etc.)

### Cache Benefits
- **Performance**: Extremely fast data retrieval
- **Scalability**: Reduces database load
- **User Experience**: Quick feed loading

## Technical Considerations

### Database Design
- **Graph Database**: For friend relationships and recommendations
- **User Cache**: Friend information and settings
- **Post Cache**: Post content and metadata
- **News Feed Cache**: Feed IDs and user mappings

### Scalability Strategies

#### Database Scaling
- **Vertical vs Horizontal Scaling**
- **SQL vs NoSQL** considerations
- **Master-Slave Replication**
- **Read Replicas**
- **Consistency Models**
- **Database Sharding**

#### System Architecture
- **Stateless Web Tier**: Easy horizontal scaling
- **Extensive Caching**: Cache data at multiple layers
- **Multiple Data Centers**: Geographic distribution
- **Message Queues**: Loose coupling between components
- **Key Metrics Monitoring**: QPS during peak hours, latency

### Privacy and Filtering
- **Muted Users**: Posts don't appear in feed
- **Selective Sharing**: Users can share with specific friends
- **Content Filtering**: Based on user preferences and settings

## Key Technical Insights

### Performance Optimization
- **Pre-computation**: Push model for majority of users
- **CDN Usage**: Fast media content delivery
- **Multi-layer Caching**: Reduces database hits
- **ID-only Storage**: Minimizes memory usage

### Scalability Patterns
- **Hybrid Fanout**: Combines push and pull models
- **Consistent Hashing**: Mitigates hotkey problems
- **Message Queues**: Handles high-volume processing
- **Graph Database**: Optimized for relationship queries

### User Experience
- **Real-time Updates**: Fast feed publishing
- **Quick Retrieval**: Pre-computed feeds
- **Media Support**: Images and videos via CDN
- **Personalization**: Privacy settings and content filtering

### System Reliability
- **Authentication**: Secure API access
- **Rate Limiting**: Prevents abuse
- **Fault Tolerance**: Multiple cache layers
- **Monitoring**: Track key performance metrics

The news feed system design showcases how to build a scalable social media platform that handles millions of users while maintaining fast performance through strategic caching, hybrid processing models, and efficient data structures. The key is balancing real-time updates with system scalability through careful architectural decisions.