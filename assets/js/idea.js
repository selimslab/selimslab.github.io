let cachedIdeas = null;
let currentFilename = null;

const readIdeas = async (filename) => {
  if (!cachedIdeas || currentFilename !== filename) {
    try {
      const response = await fetch(`/assets/data/ideas/${filename}.json`, {
        headers: {
          'Content-Type': 'application/json',
          'cache': "force-cache"
        }
      });
      cachedIdeas = await response.json();
      currentFilename = filename;
    } catch (error) {
      console.error("Error fetching ideas:", error);
      return;
    }
  }
}

const getIdeaIdx = (filename) => {
  const idx = localStorage.getItem(`ideaIdx_${filename}`);
  return idx ? parseInt(idx) : Math.floor(Math.random() * cachedIdeas.length);
}

const setIdeaIdx = (filename, idx) => {
  localStorage.setItem(`ideaIdx_${filename}`, idx.toString());
}

const getNextIdea = async (filename) => {
  if (!filename) {
    const ideaFiles = ['lyrics', 'phil', 'humor', 'psy', 'work', 'pols', 'lit', 'films'];
    const typingFiles = ['lyrics', 'lit', 'films'];

    filename = typingFiles[Math.floor(Math.random() * typingFiles.length)];
  }
  await readIdeas(filename);
  let idx = getIdeaIdx(filename);
  let nextIdx = (idx + 1) % cachedIdeas.length;
  setIdeaIdx(filename, nextIdx);
  return cachedIdeas[idx];
}