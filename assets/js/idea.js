let cachedIdeas = null;
const machine = document.getElementById("ideaMachine");

const getRandomIdea = async () => {
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
  let ideaIdx = localStorage.getItem('ideaIdx');
  if (ideaIdx) {
    ideaIdx = parseInt(ideaIdx);
  }
  else {
    ideaIdx = Math.floor(Math.random() * cachedIdeas.length);
  } 
  let nextIdx = (ideaIdx + 1) % cachedIdeas.length;
  localStorage.setItem('ideaIdx', nextIdx.toString());
  
  document.getElementById("random_idea").innerHTML = cachedIdeas[ideaIdx];
}

machine.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    getRandomIdea();
  }
});


getRandomIdea()
