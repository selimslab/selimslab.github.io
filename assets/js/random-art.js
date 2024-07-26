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

  let img = document.getElementById("artwork");
  img.src = get_random_item(cachedArt);

  let fileName = img.src.split("/").pop().split(".")[0];
  let alt = fileNameToTitle(fileName);
  img.alt = alt;
  document.getElementById("description").innerHTML = alt;
};


