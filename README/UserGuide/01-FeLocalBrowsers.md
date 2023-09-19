# 1. Run Front End on local browsers(Playwright Workers)

## 1.1 Chromium

```
npx playwright test --project=chromium
```

## 1.2 Firefox

```
npx playwright test --project=firefox
```

## 1.3 Webkit

```
npx playwright test --project=webkit
```

## 1.4 Executing a single test file on a specific project
```
npx playwright test tests/FE/examples/wiktionary.spec.js --project=firefox
```

Continue to the next section - [02-Run Front End Tests on Moon browsers](02-FeMoon.md).