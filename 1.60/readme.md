# Playwright 1.60 — Release Notes

Source: https://playwright.dev/docs/release-notes

## What's New at a Glance

```mermaid
flowchart LR
    PW["Playwright 1.60"] --> TR["Tracing"]
    PW --> IN["Interactions"]
    PW --> AS["Assertions"]
    PW --> TST["Test Runner"]
    PW --> NW["Network"]
    PW --> BC["Browser / Context"]

    TR --> TR1["tracing.startHar()<br/>tracing.stopHar()"]
    IN --> IN1["locator.drop()<br/>external drop simulation"]
    AS --> AS1["expect(page).toMatchAriaSnapshot()"]
    AS --> AS2["boxes option<br/>(adds bounding boxes for AI)"]
    TST --> TST1["test.abort()"]
    NW --> NW1["webSocketRoute.protocols()"]
    NW --> NW2["connectOverCDP({ noDefaults })"]
    BC --> BC1["browser.on('context')"]
    BC --> BC2["BrowserContext lifecycle events<br/>(download, frame*, pageclose, pageload)"]

    classDef hero fill:#0B2A4A,stroke:#0B2A4A,color:#fff;
    classDef cat fill:#E97E2D,stroke:#E97E2D,color:#fff;
    class PW hero;
    class TR,IN,AS,TST,NW,BC cat;
```

---

## Major Features

### HAR Recording on Tracing

`tracing.startHar()` and `tracing.stopHar()` are now first-class APIs. They expose the same `content`, `mode`, and `urlFilter` options as `recordHar`, and return a disposable for scope management using `await using` syntax.

**Flow:**

```mermaid
sequenceDiagram
    autonumber
    participant T as Test
    participant Tr as Tracing
    participant N as Network
    participant F as HAR file

    T->>Tr: await using har = tracing.startHar({ path, content, urlFilter })
    Tr-->>T: disposable handle
    T->>N: page.goto / page.click / fetch ...
    N-->>Tr: requests + responses captured
    Note over T,Tr: When disposable goes out of scope:
    Tr->>F: write HAR (auto on dispose)
    Tr->>Tr: tracing.stopHar() also available for manual control
```

### Drop API

A new `locator.drop()` method simulates an external drag-and-drop of files or clipboard-like data onto an element. It supports both file uploads and clipboard data, with cross-browser compatibility.

### Aria Snapshots Expansion

- `expect(page).toMatchAriaSnapshot()` now works on `Page` objects, not just `Locator` objects.
- A new `boxes` option appends each element's bounding box as `[box=x,y,width,height]` — useful for AI processing.

### Test Abort Functionality

The new `test.abort()` method aborts the currently running test from a fixture, hook, or route handler, with an optional message.

**Where you can call it from:**

```mermaid
stateDiagram-v2
    [*] --> Running
    Running --> InFixture: fixture invoked
    Running --> InHook: beforeAll / beforeEach / afterEach / afterAll
    Running --> InRouteHandler: page.route handler runs

    InFixture --> Aborted: test.abort('reason')
    InHook --> Aborted: test.abort('reason')
    InRouteHandler --> Aborted: test.abort('reason')

    Aborted --> Reported: marked aborted with message
    Reported --> [*]
```

Use it when an external precondition fails (e.g. a stub service is down) and you want to mark the test aborted — not failed — without throwing your own error.

---

## New APIs

### Browser, Context & Page
- `browser.on('context')` event fires when a context is created.
- `BrowserContext` now mirrors page lifecycle events: `download`, `frameattached`, `framedetached`, `framenavigated`, `pageclose`, `pageload`.

### Locators & Assertions
- `description` option in `getByRole()` methods for accessible description matching.
- `pseudo` option in `toHaveCSS()` for reading `::before` and `::after` styles.
- `style` option in `locator.highlight()` for custom overlay CSS.

### Network
- `webSocketRoute.protocols()` returns requested WebSocket subprotocols.
- `noDefaults` option in `connectOverCDP()` disables Playwright's default context overrides.

### Errors & Reporting
- `webError.location()` mirrors console message location properties.
- `consoleMessage.location()` exposes `line` / `column` properties.
- `testInfoError.errorContext` surfaces diagnostic information.
- `reporter.onError()` receives `workerInfo` for worker-related errors.

### Test Runner
- `{testFileBaseName}` token in snapshot path templates.
- Error handling for non-option fixture overrides and invalid worker counts.

---

## Browser Versions

| Browser | Version |
| --- | --- |
| Chromium | 148.0.7778.96 |
| Mozilla Firefox | 150.0.2 |
| WebKit | 26.4 |

---

## Breaking Changes — Migration

The following deprecated APIs were removed. Use the replacements below:

```mermaid
flowchart LR
    A1["Locator.ariaRef()"] --x R1["Removed"]
    A2["exposeBinding({ handle: true })"] --x R2["Removed"]
    A3["browser connect logger option"] --x R3["Removed"]
    A4["contextOptions.videosPath / videoSize"] --x R4["Removed"]

    R1 -.use.-> U1["locator + getByRole() patterns"]
    R2 -.use.-> U2["Plain exposeBinding (no handle)"]
    R3 -.use.-> U3["Built-in tracing for diagnostics"]
    R4 -.use.-> U4["contextOptions.recordVideo"]

    classDef rm fill:#D93A3A,stroke:#D93A3A,color:#fff;
    classDef ok fill:#16A08E,stroke:#16A08E,color:#fff;
    class R1,R2,R3,R4 rm;
    class U1,U2,U3,U4 ok;
```

| Removed | Replace with |
| --- | --- |
| `Locator.ariaRef()` | `locator` + `getByRole()` patterns |
| `handle` option on `exposeBinding` | plain `exposeBinding` (no handle) |
| `logger` option on browser connect | built-in tracing |
| `contextOptions.videosPath` / `videoSize` | `contextOptions.recordVideo` |
