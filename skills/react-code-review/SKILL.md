# Skill: React Code Review

## Identification

- **Name:** react-code-review
- **Version:** 0.1.0
- **Status:** POC / Demo

## Purpose

Assist AI agents in reviewing React and Next.js codebases by providing structured feedback on component quality, patterns, and potential issues.

## Input Parameters

| Parameter | Type   | Description                              |
|-----------|--------|------------------------------------------|
| path      | string | File or directory path to review         |
| files     | array  | Specific file references to analyze      |

## Output Format

The skill produces structured output containing:

- **suggestions** — Actionable improvement recommendations
- **notes** — Informational observations about the codebase
- **comments** — Inline review comments tied to specific file locations

## Limitations

This is a **proof-of-concept** implementation. No actual review logic is performed. All outputs are placeholder stubs demonstrating the expected interface shape for future Vercel Agent Skills integration.
