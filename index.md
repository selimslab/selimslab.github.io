---
layout: page
---


<p><a href="/about">delta</a> - give your mind some space</p>


<div class="columns is-vcentered">

  <div class="column is-4">


    <h2>Contents</h2>

      <ul>
      <li><a href='/arts/'>Arts</a></li>
        <li><a href='/sciences/'>Sciences</a></li>
        <li><a href='/engineering/'>Engineering</a></li>
        <li><a href='/lists/'>Lists</a></li>
        <li><a href='/ideas/'>Ideas</a></li>
      </ul>

  </div>

  <div class="column is-4">

    <h2>Featured</h2>
    {% include hub.html tag='top' %}

  </div>


</div>

<div class="columns">


  <div class="column is-4">
    <h2>Tools</h2>
    {% include hub.html tag='tools' %}
    
    {% include random-idea.html %}

  </div>

  <div class="column is-4"> 
    {% include earth.html %}
  </div>


</div>

{% include offline.html  %}

{% include random-art.html %}




