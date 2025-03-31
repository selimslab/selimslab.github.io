---
layout: page
---


<div class="columns is-vcentered">

  <div class="column is-6">

    <p><a href="/about">delta</a> - give your mind some space</p>

    <h2>Contents</h2>

      <ul>
      <li><a href='/arts/'>Arts</a></li>
        <li><a href='/sciences/'>Sciences</a></li>
        <li><a href='/engineering/'>Engineering</a></li>
        <li><a href='/lists/'>Lists</a></li>
        <li><a href='/ideas/'>Ideas</a></li>
      </ul>

    <h2>Featured</h2>
    {% include hub.html tag='top' %}

    <h2>Tools</h2>
    {% include hub.html tag='tools' %}
    
    {% include random-idea.html %}

  </div>


  <div class="column is-6"> 
    {% include earth.html %}
  </div>

</div>

{% include offline.html  %}

{% include random-art.html %}




