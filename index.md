---
layout: page
---



<p><a href="/about">delta</a> - give your mind some space</p>



<div class="columns">


  <div class="column is-4">

<ul>
  <li><a href='/clocks/' id="current-time"></a></li>
  <li><a href='/calendar/' id="current-date"></a></li>
</ul>

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

  </div>

</div>



{% include offline.html  %}

{% include random-art.html %}

<script src="/assets/js/moment.min.js"></script>
<script src="/assets/js/datetime.js"></script>


<script>
  show_date_and_time();

</script>

