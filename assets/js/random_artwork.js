
 (async() => {
        let images = await fetch("/assets/data/art.json")
        .then(response => response.json())
        await get_random_artwork(images)
    })();

    async function get_random_artwork(images){
        random_index = Math.floor(Math.random() * images.length)
        random_image = images[random_index]
        let doc = document.getElementById("random_artwork")
        doc.src = random_image["src"]
        doc.alt = random_image["alt"]
        document.getElementById("random_artwork-alt").innerHTML = random_image["alt"]
    }

