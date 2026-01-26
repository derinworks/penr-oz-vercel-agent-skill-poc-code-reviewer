// src/index.js
//
// Entry point for the code review runner.
// Delegates to the react-code-review skill and returns results.

import { reviewFiles } from "../skills/react-code-review/review.js";

/**
 * Run a code review on the specified path.
 *
 * @param {string} path - File or directory path to review.
 * @returns {{ suggestions: string[], notes: string[], comments: string[] }}
 */
export function runReview(path) {
  console.log(`Running review on: ${path}`);
  const results = reviewFiles([path]);
  console.log("Review complete.", results);
  return results;
}
