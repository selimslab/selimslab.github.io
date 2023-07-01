const IS_ARTWORK_ENABLED = "is_artworks_enabled";

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

shuffle = async () => {
  let images = await fetch("/assets/data/art.json").then((response) =>
    response.json()
  );

  let img = document.getElementById("artwork");
  img.src = get_random_item(images);

  let fileName = img.src.split("/").pop().split(".")[0];
  let alt = fileNameToTitle(fileName);
  img.alt = alt;
  document.getElementById("description").innerHTML = alt;
};

