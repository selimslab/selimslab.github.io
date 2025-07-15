# Chapter 12: Design a Chat System

## Overview

A chat system enables real-time messaging between users. This chapter focuses on designing a system similar to Facebook Messenger that supports both one-on-one and group chat with multiple device support and online presence indicators.

## Requirements and Scale

### Functional Requirements
- **Chat Types**: Both 1-on-1 and group chat
- **Platform**: Both mobile and web applications
- **Group Size**: Maximum 100 people per group
- **Features**: 
  - Text messaging (max 100,000 characters)
  - Online presence indicators
  - Multiple device support
  - Push notifications
- **History**: Store chat history forever
- **Scale**: 50 million DAU

### Non-Functional Requirements
- **Low Latency**: Fast message delivery
- **Reliability**: Messages should not be lost
- **Consistency**: Message order must be maintained
- **Security**: End-to-end encryption (future consideration)

## Communication Protocol Analysis

### Client-Server Communication Options

#### HTTP for Sending Messages
- **Pros**: Time-tested, widely supported, keep-alive for persistent connections
- **Cons**: Client-initiated only, not ideal for receiving messages
- **Use Case**: Suitable for sender side

#### Polling
- **Process**: Client periodically asks server for new messages
- **Pros**: Simple to implement
- **Cons**: Wasteful of server resources, high latency

#### Long Polling
- **Process**: Client holds connection open until new messages arrive or timeout
- **Pros**: Lower latency than regular polling
- **Cons**: 
  - Sender/receiver may connect to different servers
  - No way to detect client disconnection
  - Still inefficient for inactive users

#### WebSocket (Chosen Solution)
- **Process**: Bi-directional, persistent connection
- **Pros**: 
  - Real-time communication
  - Works with firewalls (ports 80/443)
  - Simplifies client/server implementation
- **Cons**: More complex connection management
- **Implementation**: Starts as HTTP, upgrades to WebSocket

## High-Level Architecture

### Service Categories

#### 1. Stateless Services
- **Purpose**: Traditional request/response services
- **Examples**: Login, signup, user profile management
- **Characteristics**: 
  - Sit behind load balancers
  - Can be monolithic or microservices
  - Use existing market solutions where possible

#### 2. Stateful Services
- **Chat Service**: Only stateful service
- **Characteristics**:
  - Maintains persistent WebSocket connections
  - Clients don't switch servers unless necessary
  - Coordinates with service discovery to prevent overloading

#### 3. Third-Party Integration
- **Push Notifications**: Critical for offline message delivery
- **Implementation**: See Chapter 10 for detailed design

### Core Components

1. **Chat Servers**: Handle real-time messaging
2. **Presence Servers**: Manage online/offline status
3. **API Servers**: Handle authentication, profiles, etc.
4. **Notification Servers**: Send push notifications
5. **Key-Value Store**: Store chat history
6. **Service Discovery**: Route clients to optimal chat servers

## Data Storage Design

### Database Selection: Key-Value Store

#### Why Key-Value Store?
- **Horizontal Scaling**: Easy to scale with growing data
- **Low Latency**: Fast data access
- **Long Tail Handling**: Better than relational databases for large indexes
- **Proven Solutions**: Facebook Messenger (HBase), Discord (Cassandra)

#### Chat Data Patterns
- **Volume**: 60 billion messages/day (Facebook + WhatsApp)
- **Access Pattern**: Recent chats accessed frequently
- **Read/Write Ratio**: 1:1 for 1-on-1 chat
- **Random Access**: Search, mentions, jump to specific messages

### Data Models

#### 1-on-1 Chat Table
- **Primary Key**: message_id
- **Fields**: message_id, message_from, message_to, content, created_at
- **Note**: message_id determines sequence (not created_at due to timing issues)

#### Group Chat Table
- **Composite Key**: (channel_id, message_id)
- **Partition Key**: channel_id
- **Rationale**: All group operations happen within a channel

### Message ID Generation

#### Requirements
- **Uniqueness**: IDs must be unique
- **Sortability**: Higher IDs for newer messages

#### Approaches
1. **MySQL auto_increment**: Not available in NoSQL
2. **Global Snowflake ID**: Discussed in Chapter 7
3. **Local Sequence Generator**: Unique within group/channel (chosen approach)

## Deep Dive: Core Components

### Service Discovery
- **Purpose**: Recommend optimal chat server for clients
- **Implementation**: Apache Zookeeper
- **Criteria**: Geographic location, server capacity
- **Process**:
  1. User login request to API servers
  2. Service discovery selects best chat server
  3. Server info returned to client
  4. Client connects via WebSocket

### Message Flows

#### 1-on-1 Chat Flow
1. User A sends message to Chat Server 1
2. Server obtains message ID from ID generator
3. Message sent to message sync queue
4. Message stored in key-value store
5. If User B online: forward to Chat Server 2
6. If User B offline: send push notification
7. Chat Server 2 forwards to User B

#### Multi-Device Synchronization
- **Tracking**: Each device maintains `cur_max_message_id`
- **New Messages**: 
  - Recipient ID matches logged-in user
  - Message ID > `cur_max_message_id`
- **Sync Process**: Each device pulls new messages from KV store

#### Group Chat Flow
- **Small Groups**: Copy message to each member's sync queue
- **Benefits**: Simplifies sync flow, each client checks own inbox
- **Limitation**: Expensive for large groups (WeChat limits to 500 members)
- **Alternative**: For large groups, use different approach

### Online Presence Management

#### Status Changes
1. **User Login**: 
   - WebSocket connection established
   - Online status and last_active_at saved in KV store
   - Presence indicator shows online

2. **User Logout**:
   - Status changed to offline in KV store
   - Presence indicator shows offline

3. **User Disconnection**:
   - **Problem**: Frequent disconnect/reconnect causes poor UX
   - **Solution**: Heartbeat mechanism

#### Heartbeat Mechanism
- **Process**: Client sends heartbeat every 5 seconds
- **Timeout**: If no heartbeat within x seconds, mark offline
- **Benefits**: Prevents status flickering during brief disconnections

#### Online Status Fanout
- **Small Groups**: Publish-subscribe model
  - Each friend pair maintains a channel
  - Status changes published to relevant channels
  - Friends subscribe to channels for updates
- **Large Groups**: Fetch status on-demand
  - Only when entering group or manually refreshing
  - Avoids 100,000 events per status change

## Memory and Scalability Considerations

### Connection Management
- **Scale**: 1M concurrent users
- **Memory**: ~10KB per connection = 10GB total
- **Reality**: Single server approach is anti-pattern
- **Solution**: Distributed architecture with multiple chat servers

### Scalability Strategies
- **Horizontal Scaling**: Multiple chat servers
- **Load Balancing**: Distribute connections across servers
- **Service Discovery**: Dynamic server assignment
- **Geographic Distribution**: Reduce latency

## Advanced Features and Considerations

### Media File Support
- **Challenge**: Significantly larger than text
- **Solutions**: Compression, cloud storage, thumbnails
- **Storage**: Separate from text messages

### End-to-End Encryption
- **Implementation**: WhatsApp model
- **Benefit**: Only sender and recipient can read messages
- **Complexity**: Key management and distribution

### Client-Side Caching
- **Purpose**: Reduce data transfer
- **Implementation**: Cache recent messages locally
- **Sync**: Periodic sync with server

### Error Handling
- **Chat Server Failure**: Service discovery provides new server
- **Message Resending**: Retry and queueing mechanisms
- **Connection Recovery**: Automatic reconnection logic

### Performance Optimization
- **Geographic Distribution**: Slack's approach for better load times
- **Caching Strategy**: User data, channels, etc.
- **Connection Pooling**: Efficient resource utilization

## Key Technical Insights

### Protocol Selection
- **WebSocket**: Optimal for real-time bi-directional communication
- **HTTP**: Still used for stateless operations
- **Balance**: Use appropriate protocol for each use case

### Data Architecture
- **Key-Value Store**: Better than relational for chat data patterns
- **Local IDs**: Simpler than global ID generation
- **Partitioning**: Channel-based for group chats

### Presence System
- **Heartbeat**: Prevents status flickering
- **Pub-Sub**: Efficient for small groups
- **On-Demand**: Required for large groups

### Scalability Patterns
- **Stateless Services**: Easy to scale horizontally
- **Stateful Services**: Require careful connection management
- **Service Discovery**: Dynamic load distribution

The chat system design demonstrates building a real-time messaging platform that balances performance, scalability, and user experience. The key is choosing appropriate protocols, data storage, and architectural patterns for different components while maintaining system reliability and low latency.