---
layout: page
title: Psy
permalink: /psy/
---

<div class="posts">
  {% for post in site.posts %}
    {% if "psy" in post.tags %}

	    <article class="post">

	      <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

	      <div class="entry">
	        {{ post.excerpt }}
	      </div>

	    </article>

    {% endif %}

  {% endfor %}
</div>
