---
tags: algorithms
---

{% for note in site.documents %}
{% if note.tags contains "stack" %}
<li>
    <a href="{{ note.url }}">{{ note.title  }}</a>
</li>
{% endif %}
{% endfor %}

