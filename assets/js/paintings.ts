interface Artwork {
    path: string;
    name: string;
}

let metadata: Artwork[] | null = null;
const img = document.getElementById("artwork") as HTMLImageElement;
let lastid: number | null = null;

async function loadMetadata(): Promise<void> {
    try {
        const response = await fetch("/assets/data/artworks.json", {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        metadata = await response.json();
    } catch (error) {
        console.error("Error fetching art:", error);
        return;
    }
}

async function load(id: number): Promise<void> {
    const artwork = metadata![id];
    img.src = artwork.path;
    img.alt = artwork.name;
    (document.getElementById("description") as HTMLElement).innerHTML = artwork.name;
}

async function preload(id: number): Promise<void> {
    try {
        await fetch(metadata![id].path);
    } catch (error) {
        console.error(error);
        return;
    }
}

const go = async (delta = 1): Promise<void> => {
    if (metadata == null) {
        await loadMetadata();
    }
    if (lastid == null) {
        lastid = Math.floor(Math.random() * metadata!.length);
    }
    const nextid = (lastid + delta) % metadata!.length;
    await load(nextid);
    lastid = nextid;
    await preload(nextid);
}

img.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        go();
    }
});

go();
