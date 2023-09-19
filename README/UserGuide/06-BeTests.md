# 06. Run Backend tests

Playwright can be used to get access to the REST API of your application. Official documentation link - https://playwright.dev/docs/test-api-testing

### 06.1 Examples covered in this seed:

- Backend API tests: [tests/BE/examples/APITest.spec.js](../../tests/BE/examples/APITest.spec.js)
- Creating API mocks and Validating API Calls: [tests/MockAPIs](../../tests/MockAPIs/tests)

CLI Command:
```
npx playwright test tests/BE/examples/APITest.spec.js  --config=./configFiles/BE/BE.config.js
```


Continue to the next section - [07-Mocking APIs using Playwright](07-MockAPIs.md).
