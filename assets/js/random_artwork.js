

 (async() => {
        let images = await fetch("/assets/data/art.json")
        .then(response => response.json())
        await get_random_artwork(images)
    })();

    const dash = new RegExp("-", "g")
    /*
    \b matches a word boundary (the beginning or ending of word);
    \w matches the following meta-character [a-zA-Z0-9].
    */
    const firstLetter =  new RegExp(/\b\w/g)

    async function get_random_artwork(images){
        random_index = Math.floor(Math.random() * images.length)
        src = images[random_index]
        let doc = document.getElementById("random_artwork")
        doc.src = src

        let base = src.split('/').pop()
        let name = base.split(".")[0]
        let alt = name.replace(dash, " ").replace(firstLetter, l => l.toUpperCase())
        doc.alt = alt
        document.getElementById("random_artwork-alt").innerHTML = alt
    }

