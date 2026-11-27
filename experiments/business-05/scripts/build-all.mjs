import { fileURLToPath } from "node:url";
import { buildSite } from "../../../engine/src/build.mjs";
import { archetypes } from "../sites/index.mjs";

for (const site of archetypes) {
  const root = fileURLToPath(site.root);
  const result = await buildSite({ rootDir: root, config: site.config, pageList: site.pages });
  console.log(`[${site.id}] built ${result.routes.length} routes (${result.sitemapEntries} indexable)`);
}
