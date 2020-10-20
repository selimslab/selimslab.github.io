---
layout: default
title: Projects
permalink: /projects/
---

{% assign sorted_tags = site.tags | sort %}

{% assign sorted_cats = site.categories | sort %}


<div class="posts">
    

        {% assign category_name = "projects" %}

        <h1 class="tag" id="projects">{{ category_name }}</h1>

        {% for tag in sorted_tags %}

            {% assign zz = tag[1] | where: "category", "projects" | sort  %}
            
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

