# Git History Health Analyzer

Analyze repository engineering stability using git history.

## Features

- Revert frequency detection
- Unstable file detection
- Engineering churn insights
- Repository health reporting

---

## Usage

```yaml
name: Repository Health

on:
  pull_request:
  push:

jobs:
  analyze:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: YOUR_USERNAME/git-history-health-analyzer@v1
        with:
          days: 30
```

---

## Example Output

```txt
Total commits: 182
Revert commits: 12

Top unstable files:
- src/auth.ts: 42 changes
- src/router.ts: 31 changes
```

---

## Inputs

| Name | Description | Default |
|---|---|---|
| days | Number of days to analyze | 30 |

---

## License

MIT