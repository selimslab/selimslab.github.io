---
layout: page
tags: meta
---

{% assign all_tags = site.documents | map: "tags"  | compact | uniq | sort %}

{{all_tags.size}} tags

{% assign tag_pages = site.documents | where: "layout", "tag"  %}

{% for p in tag_pages %}

<a href="{{p.url}}">{{p.title}}</a>

{% endfor %}



