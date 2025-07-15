# Chapter 14: Design YouTube

## Overview

YouTube is a video sharing platform that allows users to upload, watch, and interact with video content. The platform handles billions of videos and serves millions of users globally with features like video uploading, streaming, and content management.

## Requirements and Scale

### Functional Requirements
- **Core Features**: Upload videos and watch videos
- **Clients**: Mobile apps, web browsers, smart TV
- **Video Specs**: 
  - Maximum file size: 1GB
  - Support most resolutions and formats
  - Focus on small and medium-sized videos
- **Security**: Encryption required
- **Global**: Support international users

### Scale Requirements
- **Users**: 5 million DAU
- **Usage**: 30 minutes average daily time spent
- **Viewing**: 5 videos per user per day
- **Uploading**: 10% of users upload 1 video per day
- **Video Size**: 300MB average video size

### System Requirements
- **Fast Upload**: Quick video uploading
- **Smooth Streaming**: Seamless video playback
- **Quality Adaptation**: Change video quality based on network
- **Cost Efficiency**: Low infrastructure cost
- **Reliability**: High availability, scalability, and reliability

## Scale Calculations

### Storage Requirements
- **Daily Upload**: 5M users × 10% × 300MB = 150TB per day
- **Annual Storage**: 150TB × 365 = ~55PB per year

### CDN Costs
- **Daily Streaming**: 5M users × 5 videos × 0.3GB = 7.5PB transferred
- **Cost**: 7.5PB × $0.02/GB = $150,000 per day
- **Annual Cost**: $54.75M (significant expense)

## High-Level Architecture

### Core Components
1. **Client**: Devices for watching YouTube (computer, mobile, smart TV)
2. **CDN**: Video storage and streaming delivery
3. **API Servers**: Handle all non-streaming requests

### Why Leverage Cloud Services?
- **Complexity**: Building scalable blob storage/CDN is extremely complex
- **Cost**: Even large companies like Netflix use Amazon's services
- **Time**: Focus on core features rather than infrastructure
- **Reliability**: Cloud providers offer proven solutions

## Video Upload Flow

### Components
1. **Load Balancer**: Distributes requests among API servers
2. **API Servers**: Handle user requests (except streaming)
3. **Metadata DB**: Stores video metadata (sharded and replicated)
4. **Metadata Cache**: Caches video metadata and user objects
5. **Original Storage**: Blob storage for original videos
6. **Transcoding Servers**: Convert videos to different formats
7. **Transcoded Storage**: Blob storage for processed videos
8. **CDN**: Caches videos for global distribution
9. **Completion Queue**: Message queue for transcoding events
10. **Completion Handler**: Workers that process completion events

### Upload Process

#### Flow A: Upload Video File
1. Video uploaded to original storage
2. Transcoding servers fetch and process video
3. Parallel execution:
   - **3a**: Transcoded videos sent to transcoded storage
   - **3b**: Completion events queued
4. **3a.1**: Videos distributed to CDN
5. **3b.1**: Completion handler updates metadata DB/cache
6. API servers notify client of successful upload

#### Flow B: Update Metadata
- Parallel to file upload
- Client sends metadata (filename, size, format)
- API servers update metadata cache and database

## Video Streaming Flow

### Streaming Protocols
- **MPEG-DASH**: Dynamic Adaptive Streaming over HTTP
- **Apple HLS**: HTTP Live Streaming
- **Microsoft Smooth Streaming**
- **Adobe HDS**: HTTP Dynamic Streaming

### Streaming Process
- Videos streamed directly from CDN
- Edge servers closest to users deliver content
- Minimal latency due to geographic distribution
- Continuous streaming (not download-to-watch)

## Deep Dive: Video Transcoding

### Why Transcoding?
- **Storage**: Raw video consumes enormous space (hundreds of GB per hour)
- **Compatibility**: Different devices support different formats
- **Bandwidth**: Adapt quality to network conditions
- **User Experience**: Smooth playback across varying network conditions

### Video Components
- **Container**: File format (.avi, .mov, .mp4)
- **Codecs**: Compression algorithms (H.264, VP9, HEVC)

### Directed Acyclic Graph (DAG) Model
- **Purpose**: Handle different processing pipelines
- **Flexibility**: Client-defined tasks
- **Parallelism**: Tasks can run sequentially or parallel
- **Inspiration**: Facebook's streaming video engine

### Transcoding Architecture

#### 1. Preprocessor
- **Video Splitting**: Split into GOP (Group of Pictures) chunks
- **DAG Generation**: Create processing graph from configuration
- **Caching**: Store segmented videos for retry operations
- **Compatibility**: Handle older devices that don't support splitting

#### 2. DAG Scheduler
- **Function**: Split DAG into task stages
- **Output**: Tasks placed in resource manager queue
- **Example**: Video → (video encoding, audio encoding, thumbnail)

#### 3. Resource Manager
- **Components**:
  - **Task Queue**: Priority queue of tasks
  - **Worker Queue**: Available workers
  - **Running Queue**: Currently executing tasks
  - **Task Scheduler**: Optimal task-worker matching

#### 4. Task Workers
- **Function**: Execute specific tasks from DAG
- **Types**: Different workers for different tasks
- **Scalability**: Multiple workers for parallelism

#### 5. Temporary Storage
- **Metadata**: In-memory cache (small, frequently accessed)
- **Media**: Blob storage (large files)
- **Lifecycle**: Freed after processing completion

#### 6. Encoded Video
- **Output**: Final processed video files
- **Format**: Multiple resolutions and formats
- **Example**: funny_720p.mp4

## System Optimizations

### Speed Optimizations

#### 1. Parallel Video Upload
- **Problem**: Uploading whole video is slow
- **Solution**: Split video into GOP-aligned chunks
- **Benefits**: Resumable uploads, faster processing
- **Implementation**: Client-side splitting

#### 2. Geographic Upload Centers
- **Strategy**: Multiple upload centers globally
- **Implementation**: CDN as upload centers
- **Benefits**: Reduced upload latency
- **Example**: US users → North America center, China users → Asia center

#### 3. Parallelism Everywhere
- **Problem**: Sequential processing creates bottlenecks
- **Solution**: Message queues for loose coupling
- **Benefits**: Modules don't wait for previous step completion
- **Result**: Higher throughput and parallelism

### Safety Optimizations

#### 1. Pre-signed Upload URLs
- **Purpose**: Ensure only authorized users upload
- **Process**:
  1. Client requests pre-signed URL from API
  2. API returns URL with access permissions
  3. Client uploads using pre-signed URL
- **Security**: Prevents unauthorized uploads

#### 2. Content Protection
- **DRM Systems**: Apple FairPlay, Google Widevine, Microsoft PlayReady
- **AES Encryption**: Encrypt video, decrypt on playback
- **Visual Watermarking**: Overlay identifying information

### Cost-Saving Optimizations

#### CDN Cost Reduction
- **Observation**: YouTube follows long-tail distribution
- **Popular Videos**: Serve from CDN
- **Unpopular Videos**: Serve from high-capacity storage
- **Regional Content**: Don't distribute globally
- **On-demand Encoding**: Encode less popular content as needed

#### Build Own CDN
- **Strategy**: Partner with ISPs (Comcast, AT&T, Verizon)
- **Benefits**: Improved viewing experience, reduced bandwidth charges
- **Implementation**: Netflix model - build own CDN infrastructure

## Error Handling

### Error Types
1. **Recoverable Errors**: Retry with backoff
2. **Non-recoverable Errors**: Stop processing, return error code

### Component-Specific Error Handling
- **Upload Error**: Retry mechanism
- **Split Video Error**: Server-side processing for old clients
- **Transcoding Error**: Retry failed tasks
- **Preprocessor Error**: Regenerate DAG diagram
- **DAG Scheduler Error**: Reschedule tasks
- **Resource Manager**: Use replica queues
- **Task Worker**: Retry on new worker
- **API Server**: Stateless servers, redirect to healthy server
- **Metadata Cache**: Multiple replicas, replace failed nodes
- **Metadata DB**: Master-slave replication, failover mechanisms

## Additional Considerations

### Scaling Strategies
- **API Tier**: Stateless servers for horizontal scaling
- **Database**: Replication and sharding
- **Global Distribution**: CDN and regional data centers

### Live Streaming
- **Similarities**: Upload, encoding, streaming
- **Differences**:
  - Higher latency requirements
  - Different streaming protocols
  - Lower parallelism requirements
  - Different error handling (time-sensitive)

### Content Moderation
- **Automated**: System detection during upload
- **User-driven**: Flagging mechanism
- **Actions**: Remove copyrighted, pornographic, or illegal content

## Key Technical Insights

### Architecture Patterns
- **Cloud-First**: Leverage existing cloud services
- **Microservices**: Separate concerns (upload, streaming, transcoding)
- **Event-Driven**: Message queues for loose coupling
- **Geographic Distribution**: Global CDN for performance

### Performance Optimization
- **Parallel Processing**: Multiple levels of parallelism
- **Caching**: Multiple cache layers
- **Chunked Upload**: Resumable and faster uploads
- **Adaptive Streaming**: Quality based on network conditions

### Cost Management
- **Long-tail Distribution**: Optimize for popularity patterns
- **Selective CDN**: Use CDN only for popular content
- **Regional Optimization**: Serve content regionally
- **Strategic Partnerships**: CDN partnerships with ISPs

### Reliability Engineering
- **Fault Tolerance**: Handle component failures gracefully
- **Retry Logic**: Automatic recovery for transient failures
- **Redundancy**: Multiple replicas and failover mechanisms
- **Monitoring**: Track system health and performance

The YouTube design demonstrates building a global video platform that balances performance, cost, and reliability while handling massive scale through strategic use of cloud services, intelligent caching, and distributed architecture.