#!/usr/bin/env node

/**
 * CLI entry point
 *
 * Usage:
 *   node bin/cli.js review <path>
 *
 * Demonstrates: CLI → Orchestrator → Skill → Result
 */

import { runReview } from "../src/orchestrator.js";

const [command, targetPath] = process.argv.slice(2);

if (command !== "review" || !targetPath) {
  console.error("Usage: node bin/cli.js review <path>");
  process.exit(1);
}

console.log("=== Code Review Agent ===\n");

const { summary, findings } = runReview(targetPath);

console.log("\n--- Summary ---");
console.log(summary);

console.log("\n--- Findings ---");
for (const f of findings) {
  console.log(`  [${f.severity}] ${f.file}:${f.line} — ${f.message}`);
}

console.log("\n=== Done ===");
