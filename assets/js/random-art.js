
let cachedArt = null;

const shuffleArt = async () => {
  if (!cachedArt) {
    try {
      const response = await fetch("/assets/data/artworks.json", {
        headers: {
          'Content-Type': 'application/json',
          'cache': "force-cache"
        }
      });
      cachedArt = await response.json();
    } catch (error) {
      console.error("Error fetching art:", error);
      return;
    }
  }

  let artIdx = localStorage.getItem('artIdx');
  if (artIdx) {
    artIdx = parseInt(artIdx);
  } else {
    artIdx = Math.floor(Math.random() * cachedArt.length);
  }

  let nextIdx = (artIdx + 1) % cachedArt.length;
  localStorage.setItem('artIdx', nextIdx.toString());

  let img = document.getElementById("artwork");
  artwork = cachedArt[artIdx];
  img.src = artwork.path;
  img.alt = artwork.name;
  document.getElementById("description").innerHTML = artwork.name;
};


