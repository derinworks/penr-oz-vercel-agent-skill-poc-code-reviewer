/**
 * File Scanner
 *
 * Recursively discovers relevant source files in a target directory.
 * Filters by extension and excludes common non-source directories.
 */

import { readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ALLOWED_EXTENSIONS = new Set([".js", ".jsx", ".ts", ".tsx"]);
const EXCLUDED_DIRS = new Set(["node_modules", ".git", "dist", "build"]);

export function scanFiles(dir) {
  const files = [];

  function walk(currentPath) {
    const entries = readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(currentPath, entry.name);

      if (entry.isDirectory()) {
        if (!EXCLUDED_DIRS.has(entry.name)) {
          walk(fullPath);
        }
      } else if (entry.isFile() && ALLOWED_EXTENSIONS.has(extname(entry.name))) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  console.log(`[scanner] Discovered ${files.length} file(s) in "${dir}"`);
  return files;
}
