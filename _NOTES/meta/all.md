---
layout: default
---

<article>

<h2>{{site.documents.size}} notes</h2>

{% assign sorted = site.documents | sort: 'title' %}

<ul>
{% for d in sorted %}

<li>
<a href="{{d.url}}">{{d.title}}</a>
</li>
{% endfor %}
</ul>
</article>