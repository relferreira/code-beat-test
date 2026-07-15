# Code Beat Test Repository

A minimal testbed project used to validate and demonstrate the
[`relferreira/code-beat`](https://github.com/relferreira/code-beat)
GitHub Action. This repository intentionally contains simple, reviewable code so
that Code Beat can analyze pull-request diffs, request AI-powered code-quality
feedback via OpenRouter, and post inline review comments along with an overall
quality score (0–5).

## What this repository does

- Provides a small TypeScript codebase (`src/pricing.ts`) with
  pricing-utility functions.
- Integrates the **Code Beat** GitHub Action so every opened or updated pull
  request automatically receives an AI-generated code-review.
- Serves as a safe sandbox for testing messy code, Code Beat configuration
  changes, and CI behavior without affecting production projects.

## Prerequisites

| Requirement | Details |
| --- | --- |
| **Git** | For cloning and committing. |
| **Node.js** | >= 18.x (recommended). |
| **npm / yarn / pnpm** | Any package manager (only needed if you add tooling later). |
| **GitHub Account** | Required to open pull requests and trigger the workflow. |
| **OpenRouter API Key** | Used by the Code Beat action. See *Configuration* below. |

> **Note:** There is currently no `package.json` or lockfile in the repo. If you
> plan to add a build step, you will need to initialize a Node project first.

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/relferreira/code-beat-test.git
   cd code-beat-test
   ```

2. **Configure the required secret**

   - Navigate to **Settings → Secrets and variables → Actions** in your GitHub
     fork.
   - Add a new repository secret named `OPENROUTER_API_KEY` with your
     [OpenRouter](https://openrouter.ai/) API key.

3. **(Optional) Install TypeScript tooling**

   ```bash
   npm init -y
   npm install --save-dev typescript @types/node
   npx tsc --init
   ```

## Project Structure

```text
├── .github/
│   └── workflows/
│       └── code-beat.yml      # GitHub Actions workflow that triggers Code Beat on PRs
├── src/
│   └── pricing.ts              # Sample TypeScript source for AI review
├── .gitignore                  # Ignores node_modules, .DS_Store, .env
└── README.md                   # You are here!
```

## Usage Examples

### Pricing utilities

The `src/pricing.ts` module exports two helper functions for cart calculations:

```typescript
import { LineItem, calculateSubtotal, applyDiscount } from './src/pricing';

const cart: LineItem[] = [
  { sku: 'A001', unitPrice: 10.0, quantity: 2 },
  { sku: 'B002', unitPrice: 5.0, quantity: 5 },
];

const subtotal = calculateSubtotal(cart);   // 45.00
const total = applyDiscount(subtotal, 10);  // 40.50
```

### Triggering a Code Beat review

1. Create a new branch and commit some changes:

   ```bash
   git checkout -b demo/messy-code
   # Intentionally introduce sloppy code in src/pricing.ts
   git add .
   git commit -m "Demo change for Code Beat"
   git push origin demo/messy-code
   ```

2. Open a pull request on GitHub against `master`.
3. The **Code Beat** workflow will run automatically, post inline comments on
   the diff, and leave a summary score.

## Configuration Details

The workflow (`.github/workflows/code-beat.yml`) uses the following inputs:

| Input | Value / Source | Description |
| --- | --- | --- |
| `openrouter-api-key` | `${{ secrets.OPENROUTER_API_KEY }}` | Authenticates requests to OpenRouter. |
| `report` | `true` | Enables the review report. |
| `viewer-url` | `https://code-beat.relferreira.workers.dev` | URL for the detailed report. |

The action currently targets the model **`anthropic/claude-sonnet-4`** via
OpenRouter. If you wish to change the model or other advanced settings, refer
to the [code-beat repository documentation](https://github.com/relferreira/code-beat).

## Running Tests

<!-- TODO: Add test framework and sample tests. There are currently no
     automated tests in this repository. -->

At the moment, this project does **not** include a test suite. If you would like
to add one, the recommended approach is:

1. Install a test runner (e.g., **Jest** or **Vitest**):

   ```bash
   npm install --save-dev jest @types/jest ts-jest
   ```

2. Create a `tests/` directory and write specs for `src/pricing.ts`.

3. Add a `test` script to `package.json`:

   ```json
   {
     "scripts": {
       "test": "jest"
     }
   }
   ```

4. Run the tests locally:

   ```bash
   npm test
   ```

## License

<!-- TODO: Specify a license. Add a LICENSE file (e.g., MIT, Apache-2.0, or
     proprietary) and update this section. -->

This repository does not currently declare an open-source license. Please add
a `LICENSE` file at the root of the project before redistributing or reusing
the code.

## Contributing

Pull requests are welcome—especially ones that help test edge cases for the
Code Beat action! When opening a PR, keep in mind that the Code Beat bot will
automatically review your changes.
