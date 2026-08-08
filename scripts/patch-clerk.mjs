// scripts/patch-clerk.mjs
//
// Works around a known Rspack SwcJsMinimizerRspackPlugin bug
// (https://github.com/web-infra-dev/rspack/issues/10315) that strips the
// `packageName` variable from Clerk's `setPackageName({ packageName })`
// shorthand call during minification, leaving a dangling reference that
// throws `ReferenceError: packageName is not defined` at runtime.
//
// Since Rspress pins @rspack/core to the affected version, this patches
// the built output directly, matching by CONTENT (not filename) since
// chunk filenames are content-hashed and change on every build.
//
// Wired up as `postbuild` in package.json, so it runs automatically after
// every `npm run build` — locally and on Cloudflare Pages.

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SEARCH_DIRS = [
  "doc_build/static/js/async",
  "doc_build/static/js", // fallback, in case the chunk lands outside async/
];

const BROKEN = "setPackageName({packageName})";
const FIXED = 'setPackageName({packageName:"@clerk/clerk-react"})';

function collectJsFiles(dir) {
  let out = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out; // dir may not exist depending on build output shape
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    let stat;
    try {
      stat = statSync(full);
    } catch {
      continue;
    }
    if (stat.isDirectory()) {
      out = out.concat(collectJsFiles(full));
    } else if (entry.endsWith(".js")) {
      out.push(full);
    }
  }
  return out;
}

let patchedFiles = [];

for (const dir of SEARCH_DIRS) {
  for (const filePath of collectJsFiles(dir)) {
    const content = readFileSync(filePath, "utf8");
    if (content.includes(BROKEN)) {
      writeFileSync(filePath, content.split(BROKEN).join(FIXED));
      patchedFiles.push(filePath);
    }
  }
}

if (patchedFiles.length > 0) {
  console.log(
    `[patch-clerk] Patched Clerk packageName bug in ${patchedFiles.length} file(s):`
  );
  for (const f of patchedFiles) console.log(`  - ${f}`);
} else {
  console.warn(
    "[patch-clerk] No files matched the Clerk packageName pattern. " +
      "Either the bug is already fixed upstream (safe to remove this script), " +
      "or the build output structure changed (check SEARCH_DIRS above)."
  );
}
