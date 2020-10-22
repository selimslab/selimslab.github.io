---
layout: default
title: Tech
permalink: /tech/
---

{% assign sorted_tags = site.tags | sort %}

{% assign sorted_cats = site.categories | sort %}


<img src="/img/matrix.jpg" />

<div class="posts">
    
        {% assign category_name = "tech" %}

        <h1 class="tag" id="{{ category_name | downcase }}">{{ category_name }}</h1>

        {% for tag in sorted_tags %}

            {% assign zz = tag[1] | where: "category", category_name | sort  %}
            
            {% if zz != empty %}
                
                <h3>{{ tag[0] }}</h3>

                <ul>
                    {% for p in zz %}
                        <li><a href="{{ p.url }}" target="_blank">{{ p.title }}</a></li>
                    {% endfor %}
                </ul>

            {% endif %}
        
        {% endfor %}





</div>

