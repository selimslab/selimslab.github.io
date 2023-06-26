


toggle_artworks = () => {
    const is_artworks_enabled = localStorage.getItem('is_artworks_enabled');
    if (is_artworks_enabled === "false") {
        localStorage.setItem('is_artworks_enabled', 'true'); 
    } else {   
        localStorage.setItem('is_artworks_enabled', 'false'); 
    }
}

 get_random_artwork = async() => {
        const is_artworks_enabled = localStorage.getItem('is_artworks_enabled');
        if (is_artworks_enabled === "false") {

            return 
        }
        let images = await fetch("/assets/data/art.json")
        .then(response => response.json())
        await select_random_artwork(images)

        setShuffleButton()
        setStopButton()
}

const setShuffleButton = () => {
    const shuffle = '<a href="javascript:void(0);" onclick="get_random_artwork();">🔀</a>'
    document.getElementById("art-shuffle").innerHTML = shuffle
}


const setPlayButton = () => {
    const play = '<a href="javascript:void(0);" onclick="toggle_artworks();">▶️</a>'
    document.getElementById("art-toggle").innerHTML = play
}

const setStopButton = () => {   
    const stop = '<a href="javascript:void(0);" onclick="toggle_artworks();">⏹️</a>'
    document.getElementById("art-toggle").innerHTML = stop
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
    document.getElementById("srt-alt").innerHTML = alt
}

