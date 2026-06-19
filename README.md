# Code Beat Test Repo

This repository exists to test [`relferreira/code-beat`](https://github.com/relferreira/code-beat).

Open a pull request with intentionally messy code and Code Beat should:

- read the PR diff
- ask OpenRouter for a thermo-nuclear code quality review
- post inline review comments when findings map to added lines
- post a summary score from 0 to 5

## Required Secret

Add this repository secret before expecting the action to complete:

```text
OPENROUTER_API_KEY
```

The workflow uses Code Beat's default OpenRouter model unless `.github/workflows/code-beat.yml` overrides it.
