
 (async() => {
        let images = await fetch("/assets/art.json")
        .then(response => response.json())
        await get_random_avatar(images)
    })();

    async function get_random_avatar(images){
        random_index = Math.floor(Math.random() * images.length)
        random_image = images[random_index]
        let doc = document.getElementById("random-img")
        doc.src = random_image["src"]
        doc.alt = random_image["alt"]
        document.getElementById("random-img-alt").innerHTML = random_image["alt"]
    }

