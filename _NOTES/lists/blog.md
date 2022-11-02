---
layout: page
---
{% for post in site.posts %}
{{ post.date | date_to_long_string }} [ {{ post.title }} ]( {{ post.url }} )
{% endfor %}