import path from "node:path";
import { fileURLToPath } from "node:url";
import { createPreviewServer } from "../../../engine/src/preview.mjs";
import { archetypes } from "../sites/index.mjs";

const selected = process.argv[2] || "corporate";
const site = archetypes.find(item => item.id === selected);
if (!site) {
  console.error("Choose one of: " + archetypes.map(item => item.id).join(", "));
  process.exitCode = 1;
} else {
  const dist = path.join(fileURLToPath(site.root), "dist");
  const port = Number(process.env.PORT || 4173);
  createPreviewServer({ rootDir: dist }).listen(port, "127.0.0.1", () => {
    console.log(`Previewing ${site.label} at http://127.0.0.1:${port}`);
  });
}
