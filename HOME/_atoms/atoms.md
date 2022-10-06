---
---

{% include search.html %}

{{site.atoms.size}} notes

{% assign sorted = site.atoms | sort: 'title' %}
<ul>
    {% for p in sorted  %}
        <li>
            <a href="{{ p.url }}">{{ p.title }}</a>
        </li>
    {% endfor %}
</ul>
