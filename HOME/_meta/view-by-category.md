---
layout: page
tags: meta
---


{% assign sorted = site.collections | sort: 'label' %}

<ul>
    {% for c in sorted  %}
        {% if c.label != 'posts'  %}
            <li>
                <a href="/{{ c.label }}">{{ c.label  | replace:'-',' ' | upcase }}</a>
            </li>
        {% endif %}
    {% endfor %}
</ul>
