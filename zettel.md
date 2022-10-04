---
layout: page
tags: 
    - page
type: page
---


{% assign sorted = site.zettel | sort: 'title' %}
<ul>
    {% for p in sorted  %}
        <li>
            <a href="{{ p.url }}">{{ p.title }}</a>
        </li>
    {% endfor %}
</ul>
