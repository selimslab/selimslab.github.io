
let cachedJson = null;

const shuffleArt = async () => {
  if (!cachedJson) {
    try {
      const response = await fetch("/assets/data/artworks.json", {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      cachedJson = await response.json();
    } catch (error) {
      console.error("Error fetching art:", error);
      return;
    }
  }

  let artIdx = localStorage.getItem('artIdx');
  if (artIdx) {
    artIdx = parseInt(artIdx);
  } else {
    artIdx = Math.floor(Math.random() * cachedJson.length);
  }

  let nextIdx = (artIdx + 1) % cachedJson.length;
  localStorage.setItem('artIdx', nextIdx.toString());

  let img = document.getElementById("artwork");
  artwork = cachedJson[artIdx];
  img.src = artwork.path;
  img.alt = artwork.name;
  document.getElementById("description").innerHTML = artwork.name;

  // fetch the next image
  try {
    await fetch(cachedJson[nextIdx].path, {
    });
  } catch (error) {
    console.error(error);
    return;
  }

};


