---
layout: full
---


<div class="columns is-vcentered">

  <div class="column is-2">
    <ul>
      <li><a href='/clocks/' id="current-time"></a></li>
      <li><a href='/calendar/' id="current-date"></a></li>
    </ul>
  </div>

  {% include theme.html %}

</div>


<div class="columns" style="margin-top:-3rem">

<div class="column is-4">
  
    <h2 class="mono">delta</h2>
    
    <ul>

      <li><a href='/art/'>Art</a></li>
      <li><a href='/science/'>Science</a></li>
      <li><a href='/engineering/'>Engineering</a></li>

      <li><a href='/lists/'>Lists</a></li>
      <li><a href='/exp/'>Experiments</a></li>
      <li><a href='/ideas/'>Ideas</a></li>

    </ul>

{% include search.html %}

</div>



</div>

{% include offline.html  %}

{% include random-art.html %}

<script src="/assets/js/moment.min.js"></script>
<script src="/assets/js/datetime.js"></script>

<script>
  show_date_and_time();
</script>

