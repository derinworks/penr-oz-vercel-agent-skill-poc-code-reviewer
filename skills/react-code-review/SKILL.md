# Skill: React Code Review

## Identification

- **Name:** react-code-review
- **Version:** 0.2.0
- **Status:** POC / Demo

## Purpose

Assist AI agents in reviewing React and Next.js codebases by providing structured feedback through lightweight, deterministic heuristic checks.

## Input Parameters

| Parameter | Type   | Description                              |
|-----------|--------|------------------------------------------|
| path      | string | File or directory path to review         |
| options   | object | Reserved for future configuration        |

## Heuristic Rules

| Rule                  | Severity | Description                                         |
|-----------------------|----------|-----------------------------------------------------|
| file-length           | warning  | Flags files exceeding 300 lines                     |
| console-log           | low      | Detects `console.log` usage                         |
| typescript-any        | low      | Detects TypeScript `any` type in `.ts`/`.tsx` files  |
| inline-styles         | low      | Detects React inline style objects (`style={{`)      |
| multiple-components   | warning  | Flags files with more than one React component       |

## Output Format

```json
{
  "summary": "3 finding(s) across 2 file(s)",
  "findings": [
    {
      "file": "src/App.jsx",
      "rule": "console-log",
      "severity": "low",
      "message": "console.log detected"
    }
  ]
}
```

## Limitations

- No correctness guarantees — heuristic checks are string-based
- Not intended as a linting replacement
- No AI or AST parsing involved
- Rules exist solely to enhance the demonstration's realism
