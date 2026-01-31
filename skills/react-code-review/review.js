/**
 * React Code Review Skill
 *
 * Exports the reviewRepository function following the agent skill contract:
 *   reviewRepository({ path, files, options }) → { summary, findings, fileMetrics }
 */

export function reviewRepository({ path, files = [], options = {} }) {
  console.log(`[skill:react-code-review] Entering reviewRepository — path="${path}", files=${files.length}`);

  const summary = `Reviewed repository at "${path}". Discovered ${files.length} file(s). This is a POC stub — no real analysis performed.`;

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

  const fileMetrics = {
    totalFiles: files.length,
    filePaths: files,
  };

  console.log(`[skill:react-code-review] Exiting reviewRepository — ${findings.length} finding(s), ${fileMetrics.totalFiles} file(s) discovered`);

  return { summary, findings, fileMetrics };
}
