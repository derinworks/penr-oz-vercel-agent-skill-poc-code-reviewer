#!/usr/bin/env node

// bin/cli.js
//
// Command-line interface for the React Code Reviewer POC.
// Uses commander to parse arguments and delegates to src/index.js.

import { Command } from "commander";
import { runReview } from "../src/index.js";

const program = new Command();

program
  .name("code-reviewer")
  .description("POC React/Next.js code reviewer using Vercel Agent Skills")
  .version("0.1.0");

program
  .command("review <path>")
  .description("Review React/Next.js code at the given path")
  .action((path) => {
    console.log(`Starting code review for: ${path}`);
    runReview(path);
  });

program.parse();
