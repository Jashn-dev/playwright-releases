# playwright-releases

Curated release notes, visual breakdowns, and runnable examples for every Playwright release we track.

Each release lives in its own folder with:

- **`readme.md`** — release notes rewritten for clarity, with Mermaid diagrams (overview map, sequence flows, state machines, migration paths).
- **`examples/`** — minimal, runnable code samples for the new APIs and behaviors introduced in that version.

## Releases

| Version | Notes | Examples |
| --- | --- | --- |
| 1.60 | [readme](./1.60/readme.md) | [examples](./1.60/examples) |

## Why this repo

Official changelogs are dense and link-heavy. This repo distills each release into:

1. A one-glance flowchart of what shipped.
2. Focused explanations of the API changes that matter day-to-day.
3. Copy-pasteable examples you can drop into a test.

Useful when upgrading Playwright, evaluating new APIs, or onboarding a team to recent changes.

## Contributing

New releases are added as a top-level folder named after the version (e.g. `1.61/`). Follow the existing structure — `readme.md` + `examples/` — and update the table above.
