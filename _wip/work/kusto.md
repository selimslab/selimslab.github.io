---
---

### tables

- union ActorLog*, ServiceLog*
- AllClusters_ServiceLogs
- union *Events
- CommunicationEvents
- TraceEvents

## applicationTypeName

| where applicationTypeName in ("FormsApplicationType", "TrackedContentApplicationType", "UserTrackingApplicationType")

### time windows

let startTime = datetime(2023-04-27 00:00:00);
| where TIMESTAMP between (startTime..endTime)

| where LogTime > ago(2d)

| where env_time >= ago(1h)

### operators

- distinct
- count
- sort by

### examples

AllClusters_ServiceLogs
| where Service startswith "landingpageforms"
| where Message contains "Linked Submission Id"
