---
---

{% assign all_tags = site.documents | map: "tags"  | compact | join: ',' |  strip | split: ',' | uniq | sort %}

{{site.documents.size}} docs

{{all_tags.size}} tags

<div class="tags are-large">

{% for tag in all_tags %}


<span class="tag is-warning is-light">
<!-- [{{tag}}](#{{tag}}) -->
<a href="#{{tag}}">{{tag}}</a>
</span>

{% endfor %}
</div>

{% for tag in all_tags %}

## {{ tag }} 

  {% for p in site.documents -%}
    {% if p.tags contains tag %}
[{{ p.title }}]( {{p.url}} )
    {% endif %}
  {% endfor %}

{% endfor %}

