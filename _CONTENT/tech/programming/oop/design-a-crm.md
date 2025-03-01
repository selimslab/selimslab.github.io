---
title: CRM design 
---

```python
# Core Domain Models
class Entity:
    id: UUID
    created_at: datetime
    updated_at: datetime

class Contact(Entity):
    email: str
    name: str
    channels: dict[ChannelType, Channel]
    preferences: dict[PreferenceType, Preference]
    segments: list[Segment]

class Channel(Entity):
    type: ChannelType
    status: ChannelStatus
    settings: dict

# Channel Types
class ChannelType(Enum):
    EMAIL = "email"
    SMS = "sms" 
    PUSH = "push"
    WEB = "web"

# Events
class Event(Entity):
    contact_id: UUID
    type: EventType
    metadata: dict

class EventType(Enum):
    PAGE_VIEW = "page_view"
    FORM_SUBMIT = "form_submit"
    EMAIL_OPEN = "email_open"
    EMAIL_CLICK = "email_click"

# Journeys
class Journey(Entity):
    name: str
    triggers: list[Trigger]
    actions: list[Action]
    conditions: list[Condition]

class Trigger:
    event_type: EventType
    conditions: list[Condition]

class Action:
    channel: ChannelType
    template: str
    delay: timedelta

# Services
class ContactService:
    def get_contact(id: UUID) -> Contact
    def update_preferences(id: UUID, prefs: dict)
    def add_to_segment(id: UUID, segment: Segment)

class JourneyService:
    def start_journey(contact: Contact, journey: Journey)
    def process_event(event: Event)
    def evaluate_conditions(contact: Contact, conditions: list[Condition])

class MessageService:
    def send_message(contact: Contact, channel: Channel, template: str)
    def track_engagement(message_id: UUID, event_type: EventType)

# APIs 
class ContactAPI:
    def __init__(self, contact_service: ContactService)

class JourneyAPI:
    def __init__(self, journey_service: JourneyService)

class EventAPI:
    def __init__(self, journey_service: JourneyService)

class Base: 
    uid: UID

class UpdateRecord:
    updates: JSON 

class Channel(Base):
    ... 

class Email(Channel):
    ... 

class SMS(Channel):
    ... 

class PushNotification(Channel):
    ... 

class Newsletter(Channel):
    ... 

class Form(Channel):
    ...

class Preference(Base):
    ...

class ChannelConsent(Preference):
    channel_id: UID 


class Visit(Event):
    ...

class Click(Event):
    ...

class Submit(Event):
    ...

class PubSubAPI:
    def publish():
        ...
    def subscribe():
        ...

class EventAPI(PubSubAPI):
    ...

class Orchestrator:
    journeys: list[Journeys]
    events_api: EventAPI


class App: 
    contacts: ContactAPI
    channels: ChannelAPI
    orchestrator: Orchestrator

    def init():
        ... 

```