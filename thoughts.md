---
layout: default
title: Thoughts
permalink: /thoughts/
---

{% assign sorted_tags = site.tags | sort %}

{% assign sorted_cats = site.categories | sort %}


<img src="/img/people.jpg" />

<div class="posts">
    
        {% assign category_name = "thoughts" %}

        <h1 class="tag" id="{{ category_name | downcase }}">{{ category_name }}</h1>

        {% for tag in sorted_tags %}

            {% assign zz = tag[1] | where: "category", category_name | sort  %}
            
            {% if zz != empty %}
                
                <h3>{{ tag[0] }}</h3>

                <ul>
                    {% for p in zz %}
                        <li><a href="{{ p.url }}">{{ p.title }}</a></li>
                    {% endfor %}
                </ul>

            {% endif %}
        
        {% endfor %}





</div>

