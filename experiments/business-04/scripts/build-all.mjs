import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSite } from "../../../engine/src/build.mjs";
import { archetypes } from "../sites/index.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const results = [];
for (const site of archetypes) {
  const root = fileURLToPath(site.root);
  const result = await buildSite({ rootDir: root, config: site.config, pageList: site.pages });
  results.push({ id: site.id, routes: result.routes.length, sitemapEntries: result.sitemapEntries, output: path.relative(here, result.output) });
  console.log(`[${site.id}] built ${result.routes.length} routes (${result.sitemapEntries} indexable)`);
}
console.log(JSON.stringify(results, null, 2));
