"use strict";
let metadata = null;
const img = document.getElementById("artwork");
let lastid = null;
async function loadMetadata() {
    try {
        const response = await fetch("/assets/data/artworks.json", {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        metadata = await response.json();
    }
    catch (error) {
        console.error("Error fetching art:", error);
        return;
    }
}
async function load(id) {
    const artwork = metadata[id];
    img.src = artwork.path;
    img.alt = artwork.name;
    document.getElementById("description").innerHTML = artwork.name;
}
async function preload(id) {
    try {
        await fetch(metadata[id].path);
    }
    catch (error) {
        console.error(error);
        return;
    }
}
const go = async (delta = 1) => {
    if (metadata == null) {
        await loadMetadata();
    }
    if (lastid == null) {
        lastid = Math.floor(Math.random() * metadata.length);
    }
    const nextid = (lastid + delta) % metadata.length;
    await load(nextid);
    lastid = nextid;
    await preload(nextid);
};
img.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        go();
    }
});
go();
