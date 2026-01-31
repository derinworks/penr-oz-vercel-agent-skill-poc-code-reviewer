/**
 * Orchestrator
 *
 * Bridges the CLI layer to the appropriate agent skill.
 * Demonstrates the mental model: CLI → Orchestrator → Skill → Result
 */

import { reviewRepository } from "../skills/react-code-review/review.js";
import { scanFiles } from "./scanner.js";

export function runReview(path, options = {}) {
  console.log(`[orchestrator] Dispatching review skill for path="${path}"`);

  const files = scanFiles(path);
  const result = reviewRepository({ path, files, options });

  console.log("[orchestrator] Skill returned successfully");
  return result;
}
