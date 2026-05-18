# Playwright 1.60 Release Examples

Live code scripts accompanying the [TestDino Playwright 1.60 Release Guide](https://testdino.com/blog/playwright-release-guide). 

This repository demonstrates the new features introduced in Playwright v1.60:
- The Drop API (`locator.drop()`)
- HAR recording on Tracing (`tracing.startHar()`)
- ARIA snapshots with bounding boxes (`{ boxes: true }`)
- Execution guardrails (`test.abort()`)
- Enriched error diagnostics (`errorContext`)

## Setup

```bash
npm install
npx playwright install
```

## Running the Tests

```bash
npx playwright test
```

Read the full blog post on the [TestDino Blog](https://testdino.com/blog/playwright-release-guide) to understand the context and use cases for these features.
