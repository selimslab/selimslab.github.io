---
layout: page
title: Zettel
---


{% assign sorted = site.zettel | sort: 'title' %}
<ul>
    {% for p in sorted  %}
        <li>
            <a href="{{ p.url }}">{{ p.title }}</a>
        </li>
    {% endfor %}
</ul>
