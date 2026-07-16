import * as fs from "node:fs";
import * as path from "node:path";

const read = (p: string) => fs.readFileSync(p, "utf8");
const head = read("src/partials/head.html");
const nav = read("src/partials/nav.html");

const expand = (html: string) =>
    html.replace(/\{\{include:([\w.-]+)\}\}/g, (_, name) => read(`src/partials/${name}`));

// nav = article + navbar, article = article only, none = bare body
type Wrap = "nav" | "article" | "none";

interface Page {
    src: string;
    out: string;
    title: string;
    wrap: Wrap;
}

const pages: Page[] = [
    { src: "index.html", out: "index.html", title: "delta | one bit at a time", wrap: "nav" },
    { src: "paintings.html", out: "paintings/index.html", title: "paintings", wrap: "none" },
    { src: "words.html", out: "words/index.html", title: "words", wrap: "article" },
    { src: "clock.html", out: "clock/index.html", title: "clock", wrap: "article" },
    { src: "player.html", out: "player/index.html", title: "player", wrap: "nav" },
    { src: "pub.html", out: "pub/index.html", title: "pub", wrap: "nav" },
    { src: "404.html", out: "404.html", title: "404 - page not found", wrap: "nav" },
];

function shell(page: Page, body: string): string {
    const inner = page.wrap === "none"
        ? body
        : `<article>\n${page.wrap === "nav" ? nav : ""}\n${body}\n</article>`;
    return `<!DOCTYPE html>
<html lang="en">
${head.replace(/\{\{title\}\}/g, page.title)}
<body>
${inner}
</body>
<script src="/assets/js/theme.js"></script>
</html>
`;
}

function listFiles(dir: string): string[] {
    return (fs.readdirSync(dir, { recursive: true }) as string[])
        .map(f => path.join(dir, f))
        .filter(f => fs.statSync(f).isFile());
}

function shuffle<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function writeArtworks(): void {
    const files = listFiles("assets/static/art").filter(f => /\.(jpe?g|png|gif)$/i.test(f));
    shuffle(files);
    const artworks = files.map(f => ({
        name: path.basename(f)
            .replace(/\.[^.]+$/, "")
            .split(/[-_]/)
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
        path: "/" + f.split(path.sep).join("/"),
    }));
    fs.writeFileSync("assets/data/artworks.json", JSON.stringify(artworks, null, 2));
}

function writeTracks(): void {
    const files = listFiles("assets/static/music").filter(f => /\.mp3$/i.test(f)).sort();
    const byGenre: Record<string, { id: string; title: string }[]> = {};
    files.forEach((f, i) => {
        const genre = path.basename(path.dirname(f));
        (byGenre[genre] ??= []).push({ id: String(i), title: path.basename(f, ".mp3") });
    });
    fs.writeFileSync("assets/data/tracks.json", JSON.stringify(byGenre, null, 2));
}

writeArtworks();
writeTracks();

fs.rmSync("dist", { recursive: true, force: true });
for (const page of pages) {
    const out = path.join("dist", page.out);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, shell(page, expand(read(`src/pages/${page.src}`))));
}
fs.symlinkSync(path.resolve("assets"), "dist/assets");
fs.copyFileSync("robots.txt", "dist/robots.txt");

console.log(`built ${pages.length} pages to dist/`);
