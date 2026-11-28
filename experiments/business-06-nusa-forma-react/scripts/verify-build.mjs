import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";

const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
const assetsUrl = new URL("../dist/assets/", import.meta.url);
const assets = await readdir(assetsUrl);

assert.match(html, /<title>Nusa Forma Studio — Ruang yang memahami cara hidup<\/title>/);
assert.match(html, /name="robots" content="noindex,nofollow"/);
assert.match(html, /name="description"/);
assert.ok(assets.some((file) => file.endsWith(".js")), "Vite JavaScript bundle exists");
assert.ok(assets.some((file) => file.endsWith(".css")), "Vite CSS bundle exists");
for (const file of assets) await access(new URL(`../dist/assets/${file}`, import.meta.url));

console.log(`Verified production HTML and ${assets.length} bundled assets.`);
