# penr-oz-vercel-agent-skill-poc-code-reviewer

Implementation of POC example React Code reviewer utilizing Vercel Agent skills.

## Overview

This is a **proof-of-concept** repository that demonstrates how to structure a project around [Vercel Labs Agent Skills](https://github.com/vercel-labs) for AI-assisted code review of React and Next.js codebases. The design is intentionally minimal — all review logic is stubbed out so the focus remains on the skill interface and project architecture.

## Project Structure

```
├── README.md
├── package.json
├── .gitignore
├── skills/
│   └── react-code-review/
│       ├── SKILL.md          # Skill specification (inputs, outputs, metadata)
│       └── review.js         # Placeholder skill module
├── src/
│   └── index.js              # Review runner entry point
└── bin/
    └── cli.js                # CLI interface using commander
```

## Agent Skills Integration

The `skills/react-code-review/` directory contains the skill definition:

- **SKILL.md** — Declares the skill's purpose, input parameters, and output format so an AI agent can discover and invoke it.
- **review.js** — Exports a `reviewFiles` function that will eventually perform the actual analysis. Currently returns empty placeholder results.

## Getting Started

```bash
# Install dependencies
npm install

# Run the CLI
node bin/cli.js review .

# Or use the npm start script
npm start
```

## Development Status

This project is at the **scaffolding stage**. The following are explicitly out of scope for this initial skeleton:

- AST parsing or static analysis
- AI / LLM integration calls
- Deployment configuration
- GitHub API integration
- Linting enforcement

These capabilities are intended for future iterations.

## License

MIT
