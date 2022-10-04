---
title: Sliding Window 

---


check out characterReplacement



{% for note in site.documents %}
{% if note.tags contains "sliding" %}
<li>
    <a href="{{ note.url }}">{{ note.title  }}</a>
</li>
{% endif %}
{% endfor %}


