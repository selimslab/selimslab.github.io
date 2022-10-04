--- 
---


{% for note in site.documents %}
{% if note.tags contains "array" %}
<li>
    <a href="{{ note.url }}">{{ note.title  }}</a>
</li>
{% endif %}
{% endfor %}





