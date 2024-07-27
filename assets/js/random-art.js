fileNameToTitle = (fileName) => {
  const dash = new RegExp("-", "g");
  /*
\b matches a word boundary (the beginning or ending of word);
\w matches the following meta-character [a-zA-Z0-9].
*/
  const firstLetter = new RegExp(/\b\w/g);
  return fileName
    .replace(dash, " ")
    .replace(firstLetter, (l) => l.toUpperCase());
};

let cachedArt = null;

const shuffleArt = async () => {
  if (!cachedArt) {
    try {
      const response = await fetch("/assets/data/art.json", {
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
  img.src =cachedArt[artIdx];

  let fileName = img.src.split("/").pop().split(".")[0];
  img.alt = fileNameToTitle(fileName);
  document.getElementById("description").innerHTML = img.alt;
};


