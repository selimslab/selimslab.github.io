---
tags: algorithms
---

{% for note in site.documents %}
{% if note.tags contains "queue" %}
<li>
    <a href="{{ note.url }}">{{ note.title  }}</a>
</li>
{% endif %}
{% endfor %}


