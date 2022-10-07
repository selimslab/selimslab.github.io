---
---

{% assign all_tags = site.documents | map: "tags"  | compact | uniq | sort %}

{{site.documents.size}} docs

{{all_tags.size}} tags

<div class="tags are-large">

{% for tag in all_tags %}


<span class="tag is-warning is-light">
<a href="#{{tag}}">{{tag}}</a>
</span>

{% endfor %}
</div>

{% for tag in all_tags %}

## {{ tag }} 

  {% for p in site.documents -%}
    {% if p.tags contains tag %}
<a href="{{p.url}}">{{p.title}}</a>
    {% endif %}
  {% endfor %}

{% endfor %}

