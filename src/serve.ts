import * as fs from "node:fs";
import * as http from "node:http";
import * as path from "node:path";

const ROOT = "dist";
const PORT = Number(process.env.PORT) || 8000;

const MIME: Record<string, string> = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".md": "text/plain",
    ".txt": "text/plain",
    ".ico": "image/x-icon",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".mp3": "audio/mpeg",
};

http.createServer((req, res) => {
    let filePath = path.join(ROOT, decodeURIComponent((req.url ?? "/").split("?")[0]));
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
    }
    if (!fs.existsSync(filePath)) {
        res.writeHead(404, { "Content-Type": "text/html" });
        fs.createReadStream(path.join(ROOT, "404.html")).pipe(res);
        return;
    }
    res.writeHead(200, { "Content-Type": MIME[path.extname(filePath).toLowerCase()] ?? "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
}).listen(PORT, () => console.log(`serving ${ROOT}/ at http://localhost:${PORT}`));
