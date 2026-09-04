import * as fs from "node:fs";
import * as path from "node:path";

const read = (p: string) => fs.readFileSync(p, "utf8");
const head = read("src/partials/head.html");

const expand = (html: string) =>
    html.replace(/\{\{include:([\w.-]+)\}\}/g, (_, name) => read(`src/partials/${name}`));

interface Page {
    src: string;
    out: string;
    title: string;
}

const pages: Page[] = [
    { src: "index.html", out: "index.html", title: "delta | one bit at a time" },
    { src: "words.html", out: "words/index.html", title: "words" },
    { src: "pub.html", out: "pub/index.html", title: "pub" },
    { src: "404.html", out: "404.html", title: "404 - page not found" },
];

function shell(page: Page, body: string): string {
    const inner = `<article>\n${body}\n</article>`;
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

fs.rmSync("dist", { recursive: true, force: true });
for (const page of pages) {
    const out = path.join("dist", page.out);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, shell(page, expand(read(`src/pages/${page.src}`))));
}
fs.symlinkSync(path.resolve("assets"), "dist/assets");
fs.copyFileSync("robots.txt", "dist/robots.txt");

console.log(`built ${pages.length} pages to dist/`);
