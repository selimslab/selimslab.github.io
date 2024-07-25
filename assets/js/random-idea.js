let cachedIdeas = null;

const getRandomIdea = async () => {
  var machine = document.getElementById("ideaMachine");
  animate(machine, "shakey");

  if (!cachedIdeas) {
    try {
      const response = await fetch("/assets/data/ideas.json", {
        headers: {
          'Content-Type': 'application/json',
          'cache': "force-cache"
        }
      });
      cachedIdeas = await response.json();
    } catch (error) {
      console.error("Error fetching ideas:", error);
      return;
    }
  }

  document.getElementById("random_idea").innerHTML = get_random_item(cachedIdeas);
}


