/**
 * React Code Review Skill
 *
 * Exports the reviewRepository function following the agent skill contract:
 *   reviewRepository({ path, files, options }) → { summary, findings, fileMetrics }
 *
 * Implements lightweight heuristic checks (string-based detection):
 *   - file-length:          Files exceeding a line-count threshold
 *   - console-log:          console.log usage
 *   - typescript-any:       TypeScript `any` usage
 *   - inline-styles:        React inline style objects (style={{)
 *   - multiple-components:  More than one React component per file
 */

import { readFileSync } from "node:fs";
import { relative } from "node:path";

const MAX_LINE_COUNT = 300;

/**
 * Rule: file-length
 * Flag files exceeding MAX_LINE_COUNT lines.
 */
function checkFileLength(file, lines) {
  if (lines.length > MAX_LINE_COUNT) {
    return [
      {
        file,
        rule: "file-length",
        severity: "warning",
        message: `File has ${lines.length} lines (threshold: ${MAX_LINE_COUNT})`,
      },
    ];
  }
  return [];
}

/**
 * Rule: console-log
 * Detect console.log statements.
 */
function checkConsoleLog(file, lines) {
  const findings = [];
  for (const line of lines) {
    if (/console\.log\s*\(/.test(line)) {
      findings.push({
        file,
        rule: "console-log",
        severity: "low",
        message: "console.log detected",
      });
    }
  }
  return findings;
}

/**
 * Rule: typescript-any
 * Detect TypeScript `any` type usage in .ts/.tsx files.
 */
function checkTypescriptAny(file, lines) {
  if (!file.endsWith(".ts") && !file.endsWith(".tsx")) return [];

  const findings = [];
  for (const line of lines) {
    if (/:\s*any\b/.test(line) || /\bas\s+any\b/.test(line)) {
      findings.push({
        file,
        rule: "typescript-any",
        severity: "low",
        message: "TypeScript `any` type detected",
      });
    }
  }
  return findings;
}

/**
 * Rule: inline-styles
 * Detect React inline style objects (style={{ ... }}).
 */
function checkInlineStyles(file, lines) {
  const findings = [];
  for (const line of lines) {
    if (/style\s*=\s*\{\{/.test(line)) {
      findings.push({
        file,
        rule: "inline-styles",
        severity: "low",
        message: "Inline style object detected",
      });
    }
  }
  return findings;
}

/**
 * Rule: multiple-components
 * Estimate React component count per file and flag when > 1.
 *
 * Heuristic: count function/arrow declarations whose name starts with an
 * uppercase letter, a common React convention.
 */
function checkMultipleComponents(file, lines) {
  let count = 0;

  for (const line of lines) {
    if (/^\s*(export\s+)?(default\s+)?function\s+[A-Z]/.test(line)) {
      count++;
    } else if (/^\s*(export\s+)?(const|let)\s+[A-Z]\w*\s*=\s*(\(|function)/.test(line)) {
      count++;
    }
  }

  if (count > 1) {
    return [
      {
        file,
        rule: "multiple-components",
        severity: "warning",
        message: `File contains an estimated ${count} React components`,
      },
    ];
  }
  return [];
}

/**
 * Run all heuristic rules against a single file.
 */
function analyzeFile(file, lines) {
  return [
    ...checkFileLength(file, lines),
    ...checkConsoleLog(file, lines),
    ...checkTypescriptAny(file, lines),
    ...checkInlineStyles(file, lines),
    ...checkMultipleComponents(file, lines),
  ];
}

/**
 * Main skill entry point.
 */
export function reviewRepository({ path, files = [], options = {} }) {
  console.log(`[skill:react-code-review] Entering reviewRepository — path="${path}", files=${files.length}`);

  const findings = [];

  for (const fullPath of files) {
    const relPath = relative(path, fullPath);
    let content;
    try {
      content = readFileSync(fullPath, "utf-8");
    } catch (err) {
      findings.push({
        file: relPath,
        rule: "unreadable-file",
        severity: "warning",
        message: `Unable to read file: ${err.message}`,
      });
      continue;
    }

    const lines = content.split("\n");
    findings.push(...analyzeFile(relPath, lines));
  }

  const fileSet = new Set(findings.map((f) => f.file));
  const summary =
    findings.length === 0
      ? "No findings — clean review."
      : `${findings.length} finding(s) across ${fileSet.size} file(s)`;

  const fileMetrics = {
    totalFiles: files.length,
    filePaths: files,
  };

  console.log(`[skill:react-code-review] Exiting reviewRepository — ${findings.length} finding(s), ${fileMetrics.totalFiles} file(s) discovered`);

  return { summary, findings, fileMetrics };
}
