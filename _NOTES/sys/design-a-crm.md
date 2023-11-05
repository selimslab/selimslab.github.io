---
tags: sys 
---

```py

class Base: 
    uid: UID

class UpdateRecord:
    updates: JSON 

class Contact(Base):
    email: Email 
    subscriptions: list[Channel]
    preferences: list[Preference]
    
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


class Event(Base):
    ...

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

class Trigger:
    source: Event
    target: Event 

class Journey:
    contact: Contact
    triggers: list[Trigger]


class CRUDAPI:
    def create():
        ...
    def read():
        ...
    def update():
        ...
    def delete():
        ...

class ContactAPI(CRUDAPI):
    ... 

class ChannelAPI(CRUDAPI):
    ... 

class JourneyAPI(CRUDAPI):
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