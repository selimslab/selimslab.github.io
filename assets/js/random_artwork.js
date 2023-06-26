

const IS_ARTWORK_ENABLED = "is_artworks_enabled"

toggle_artworks = () => {
    if (window.localStorage.getItem(IS_ARTWORK_ENABLED) === "false") {
        window.localStorage.setItem(IS_ARTWORK_ENABLED, 'true'); 
        get_random_artwork()
    } else {   
        window.localStorage.setItem(IS_ARTWORK_ENABLED, 'false'); 
        clear_artwork()
    }

}

 get_random_artwork = async() => {
        if ( window.localStorage.getItem(IS_ARTWORK_ENABLED) === "false") {
            return 
        }
        let images = await fetch("/assets/data/art.json")
        .then(response => response.json())
        await select_random_artwork(images)
}


clear_artwork = () => {
    let img = document.getElementById("art-img")
    img.src = ""
    img.alt = ""
    document.getElementById("art-alt").innerHTML = ""
    setPlayButton()
}

const dash = new RegExp("-", "g")
/*
\b matches a word boundary (the beginning or ending of word);
\w matches the following meta-character [a-zA-Z0-9].
*/
const firstLetter =  new RegExp(/\b\w/g)

async function select_random_artwork(images){
    let img = document.getElementById("art-img")
    img.src = get_random_item(images)

    let base = img.src.split('/').pop()
    let name = base.split(".")[0]
    let alt = name.replace(dash, " ").replace(firstLetter, l => l.toUpperCase())
    img.alt = alt 
    document.getElementById("art-alt").innerHTML = alt
}

