---
---

{% assign all_tags = site.documents | map: "tags"  | compact | join: ',' |  strip | split: ',' | uniq | sort %}

{{site.documents.size}} docs

{{all_tags.size}} tags

{% for tag in all_tags %}

## {{ tag }} 

  {% for p in site.documents -%}
    {% if p.tags contains tag %}
[{{ p.title }}]( {{p.url}} )
    {% endif %}
  {% endfor %}

{% endfor %}

