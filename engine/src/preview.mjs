import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(here, "..", "dist");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

export function createPreviewServer({ rootDir = defaultRoot } = {}) {
  const root = path.resolve(rootDir);
  return http.createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      const relative = pathname.replace(/^\/+/, "");
      let target = path.resolve(root, relative || "index.html");
      if (target !== root && !target.startsWith(root + path.sep)) {
        response.writeHead(400).end("Bad request");
        return;
      }
      try {
        const stat = await fs.stat(target);
        if (stat.isDirectory()) target = path.join(target, "index.html");
        const content = await fs.readFile(target);
        response.writeHead(200, { "content-type": types[path.extname(target)] || "application/octet-stream" });
        response.end(content);
      } catch (error) {
        if (error.code !== "ENOENT" && error.code !== "ENOTDIR") throw error;
        const notFound = await fs.readFile(path.join(root, "404.html"));
        response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
        response.end(notFound);
      }
    } catch {
      response.writeHead(400).end("Bad request");
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4173);
  createPreviewServer().listen(port, "127.0.0.1", () => {
    console.log(`Previewing ${defaultRoot} at http://127.0.0.1:${port}`);
  });
}
