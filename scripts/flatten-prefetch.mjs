// Post-build fix for `output: "export"`.
//
// Next 16 writes per-segment prefetch payloads for nested routes as folders,
// e.g. out/products/wave-runner/__next.products/$d$id/__PAGE__.txt
// but the client router requests the flat name
//      out/products/wave-runner/__next.products.$d$id.__PAGE__.txt
// On a static host (GitHub Pages) that request 404s, which logs console errors
// and disables prefetching. This copies each nested payload to its flat name.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
let copied = 0;

function walk(dir, visit) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, visit);
    else visit(full);
  }
}

function findSegmentRoots(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      // dir is the page folder; full is a nested segment-data tree.
      walk(full, (file) => {
        if (!file.endsWith(".txt")) return;
        const flatName = relative(dir, file).split(sep).join(".");
        const target = join(dir, flatName);
        if (!existsSync(target)) {
          copyFileSync(file, target);
          copied++;
        }
      });
    } else if (name !== "_next") {
      findSegmentRoots(full);
    }
  }
}

if (existsSync(OUT)) {
  findSegmentRoots(OUT);
  console.log(`flatten-prefetch: wrote ${copied} flat prefetch payload(s)`);
}
