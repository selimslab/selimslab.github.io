---
layout: page
title: Zettel
tags: page

---


{% assign sorted = site.zettel | sort: 'title' %}
<ul>
    {% for p in sorted  %}
        <li>
            <a href="{{ p.url }}">{{ p.title }}</a>
        </li>
    {% endfor %}
</ul>
