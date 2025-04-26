---
layout: delta
---


<div class="columns is-vcentered">

  <div class="column is-4">

    <p><a href='/clocks/' id="current-time"></a></p>
    <p><a href='/calendar/' id="current-date"></a></p>

    <h2>home</h2>
    
    <p><a href='/art/'>Art</a></p>
    <p><a href='/science/'>Science</a></p>
    <p><a href='/engineering/'>Engineering</a></p>
    <p><a href='/lists/'>Lists</a></p>
    <p><a href='/exp/'>Experiments</a></p>
    <p><a href='/ideas/'>Ideas</a></p>


  </div>

</div>

{% include offline.html  %}

{% include random-art.html %}

<script src="/assets/js/moment.min.js"></script>
<script src="/assets/js/datetime.js"></script>

<script>
  show_date_and_time();
</script>

