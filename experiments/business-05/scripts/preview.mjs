import path from "node:path";
import { fileURLToPath } from "node:url";
import { createPreviewServer } from "../../../engine/src/preview.mjs";
import { archetypes } from "../sites/index.mjs";

const id = process.argv[2];
const site = archetypes.find(item => item.id === id);
if (!site) {
  console.error(`Choose one archetype: ${archetypes.map(item => item.id).join(", ")}`);
  process.exit(1);
}
const root = path.join(fileURLToPath(site.root), "dist");
const port = Number(process.env.PORT || 4173);
createPreviewServer({ rootDir: root }).listen(port, "127.0.0.1", () => {
  console.log(`Previewing ${site.label} at http://127.0.0.1:${port}`);
});
