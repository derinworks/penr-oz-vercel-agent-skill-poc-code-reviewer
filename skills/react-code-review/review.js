/**
 * React Code Review Skill
 *
 * Exports the reviewRepository function following the agent skill contract:
 *   reviewRepository({ path, options }) → { summary, findings }
 */

export function reviewRepository({ path, options = {} }) {
  console.log(`[skill:react-code-review] Entering reviewRepository — path="${path}"`);

  const summary = `Reviewed repository at "${path}". This is a POC stub — no real analysis performed.`;

  const findings = [
    {
      file: "src/App.jsx",
      line: 12,
      severity: "warning",
      message: "Component missing display name (POC example finding)",
    },
    {
      file: "src/hooks/useData.js",
      line: 5,
      severity: "info",
      message: "Consider memoising expensive computation (POC example finding)",
    },
  ];

  console.log(`[skill:react-code-review] Exiting reviewRepository — ${findings.length} finding(s)`);

  return { summary, findings };
}
