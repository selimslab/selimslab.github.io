# Chapter 10: Design a Notification System

## Overview

A notification system sends important information to users through multiple channels: mobile push notifications, SMS messages, and emails. It's designed to handle millions of notifications daily while maintaining reliability and user preferences.

## Requirements and Scale

### Functional Requirements
- **Notification Types**: Push notifications, SMS messages, and emails
- **Real-time**: Soft real-time system (slight delays acceptable under high load)
- **Devices**: iOS, Android, laptop/desktop
- **Triggers**: Client applications and server-side scheduling
- **Opt-out**: Users can disable notifications

### Scale Requirements
- **10 million** mobile push notifications per day
- **1 million** SMS messages per day
- **5 million** emails per day

## Notification Types Deep Dive

### iOS Push Notifications
**Components Required**:
1. **Provider**: Builds and sends notification requests to APNS
2. **Apple Push Notification Service (APNS)**: Apple's remote service
3. **iOS Device**: End client receiving notifications

**Data Requirements**:
- **Device Token**: Unique identifier for push notifications
- **Payload**: JSON dictionary containing notification content

### Android Push Notifications
- Uses **Firebase Cloud Messaging (FCM)** instead of APNS
- Similar flow to iOS notifications
- Note: FCM unavailable in China (alternatives: Jpush, PushY)

### SMS Messages
- **Third-party services**: Twilio, Nexmo
- Most are commercial services
- Provides better delivery rates and analytics

### Email
- **Third-party services**: Sendgrid, Mailchimp
- Better delivery rates and data analytics than self-hosted
- Companies typically prefer commercial services

## High-Level Architecture

### Contact Info Gathering Flow
1. User installs app or signs up
2. API servers collect contact information
3. Store in database with proper schema

**Database Schema**:
- **User Table**: Email addresses, phone numbers
- **Device Table**: Device tokens (one user can have multiple devices)

### Initial Design Problems
1. **Single Point of Failure (SPOF)**: One notification server
2. **Hard to Scale**: All components in one server
3. **Performance Bottleneck**: Resource-intensive processing

### Improved High-Level Design

**Components**:
1. **Service 1 to N**: Microservices triggering notifications
2. **Notification Servers**: API providers with horizontal scaling
3. **Cache**: User info, device info, notification templates
4. **Database**: User data, notification data, settings
5. **Message Queues**: Decouple components, handle high volume
6. **Workers**: Process events from queues
7. **Third-party Services**: Deliver notifications
8. **End Devices**: iOS, Android, SMS, Email

**Workflow**:
1. Service calls notification server APIs
2. Server fetches metadata from cache/database
3. Notification event sent to appropriate queue
4. Workers pull events from queues
5. Workers send to third-party services
6. Third-party services deliver to devices

### API Example
```
POST https://api.example.com/v/sms/send
```

## Deep Dive: Critical Components

### Reliability

#### Data Loss Prevention
- **Requirement**: Notifications can be delayed/reordered but never lost
- **Solution**: 
  - Persist notification data in database
  - Implement retry mechanism
  - Notification log database for persistence

#### Exactly-Once Delivery
- **Reality**: Cannot guarantee exactly-once delivery in distributed systems
- **Solution**: Dedupe mechanism
  - Check event ID when notification arrives
  - Discard if seen before
  - Otherwise send notification

### Additional Components

#### Notification Templates
- **Problem**: Millions of notifications with similar formats
- **Solution**: Preformatted templates with customizable parameters

**Example Template**:
```
BODY: You dreamed of it. We dared it. [ITEM NAME] is back - only until [DATE].
CTA: Order Now. Or, Save My [ITEM NAME]
```

**Benefits**:
- Consistent format
- Reduced error margin
- Time savings

#### Notification Settings
- **Problem**: Users overwhelmed by too many notifications
- **Solution**: Fine-grained control per user

**Settings Table Schema**:
- `user_id`: User identifier
- `channel`: push notification, email, or SMS
- `opt_in`: Boolean for receiving notifications

#### Rate Limiting
- **Purpose**: Prevent overwhelming users
- **Implementation**: Limit notifications per user per time period
- **Risk**: Users might disable notifications completely if too frequent

#### Retry Mechanism
- **Trigger**: Third-party service failure
- **Process**: Add failed notification back to message queue
- **Escalation**: Alert developers if problem persists

#### Security
- **iOS/Android**: Use appKey and appSecret for API security
- **Access Control**: Only authenticated/verified clients can send notifications

#### Monitoring
- **Key Metric**: Total number of queued notifications
- **Action**: Add more workers if queue grows too large
- **Purpose**: Prevent delivery delays

#### Event Tracking
- **Metrics**: Open rate, click rate, engagement
- **Purpose**: Understand customer behaviors
- **Integration**: Analytics service with notification system

## Updated Final Design

### Enhanced Features
1. **Authentication and Rate Limiting**: Added to notification servers
2. **Retry Mechanism**: Handle notification failures gracefully
3. **Notification Templates**: Efficient and consistent creation
4. **Monitoring and Tracking**: System health checks and improvements

### System Flow with All Components
1. **Authentication**: Verify client requests
2. **Rate Limiting**: Check user notification frequency
3. **Template Processing**: Apply notification templates
4. **Queue Management**: Handle high-volume processing
5. **Worker Scaling**: Auto-scale based on queue size
6. **Failure Handling**: Retry mechanism for failed deliveries
7. **Analytics**: Track notification performance
8. **User Settings**: Respect opt-out preferences

## Key Technical Insights

### Scalability Strategies
- **Horizontal Scaling**: Multiple notification servers
- **Message Queues**: Decouple components and handle volume spikes
- **Separate Queues**: One per notification type (prevents cascading failures)
- **Worker Pools**: Parallel processing of notifications

### Reliability Patterns
- **Database Persistence**: Prevent data loss
- **Retry Logic**: Handle transient failures
- **Dedupe Mechanism**: Reduce duplicate notifications
- **Monitoring**: Proactive issue detection

### User Experience
- **Soft Real-time**: Balance speed with system stability
- **Opt-out Capability**: User control over notifications
- **Rate Limiting**: Prevent notification fatigue
- **Templates**: Consistent user experience

### Operational Considerations
- **Third-party Dependencies**: Plan for service outages
- **Geographic Restrictions**: FCM unavailable in China
- **Security**: API authentication and authorization
- **Analytics**: Data-driven optimization

The notification system design demonstrates building a reliable, scalable system that balances performance with user experience while handling millions of notifications across multiple channels. The key is proper component separation, robust error handling, and respecting user preferences.