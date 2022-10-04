---
title: Tree 

---

```py
def tree():
    return collections.defaultdict(tree)
```


{% for note in site.documents %}
{% if note.tags contains "tree" %}
<li>
    <a href="{{ note.url }}">{{ note.title  }}</a>
</li>
{% endif %}
{% endfor %}










