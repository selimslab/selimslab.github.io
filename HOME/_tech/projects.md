---
layout: post
title: Mini Projects
---


{% assign sorted = site.projects | sort: 'title' %}
<ul>
    {% for p in sorted  %}
        <li>
            <a href="{{ p.url }}">{{ p.title }}</a>
        </li>
    {% endfor %}
</ul>
