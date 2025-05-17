let cachedIdeas = null;

const readIdeas = async (filename) => {
  if (!cachedIdeas) {
    try {
      const response = await fetch(`/assets/data/${filename}.json`, {
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
}

const getIdeaIdx = () => {
  const idx = localStorage.getItem('ideaIdx');
  return idx ? parseInt(idx) : Math.floor(Math.random() * cachedIdeas.length);;
}

const setIdeaIdx = (idx) => {
  localStorage.setItem('ideaIdx', idx.toString());
}

const getNextIdea = async (filename) => {
  console.log("getNextIdea", filename);
  await readIdeas(filename);
  let idx = getIdeaIdx();
  let nextIdx = (idx + 1) % cachedIdeas.length;
  setIdeaIdx(nextIdx);
  return cachedIdeas[idx];
}


