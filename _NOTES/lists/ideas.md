---
---


[Tag: quote - Sketchplanations](https://sketchplanations.com/tags/quote)

[Familiar and Unfamiliar Quotations (norvig.com)](https://www.norvig.com/quotations.html)

<article>
{% assign n = site.data.ideas | size %}
{% assign ideas = site.data.ideas | sample: n %}
{% for idea in ideas %}
<p style="white-space: pre-line;">{{idea}}</p>
{% endfor %}
</article>


