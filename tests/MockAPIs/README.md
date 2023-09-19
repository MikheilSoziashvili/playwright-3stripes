# 1. Mock APIs

## 1.1 Use Case

- Experimental APIs and APIs which are not (yet) fully supported by all browsers.

API mocks can be used to test application behaviour in such cases.

[Official documentation](https://playwright.dev/docs/mock)

## 1.2 Example covered in the seed

In the code examples in the seed(directory: tests/MockAPIs), we are considering a web app that uses [battery API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getBattery) to show a device's battery status. We'll mock the battery API and check that the page correctly displays the battery status.

Examples covered:

1. **showBatteryStatus.spec.js** : Mocking the battery API and check that the page correctly displays the battery status.
2. **updateBatteryStatus.spec.js**: To test that the app correctly reflects battery status updates.
3. **verifyAPICalls.spec.js**: To test if the page made all expected APIs calls.

## 11.3 Test Execution

- Switch to the mock-api test directory by executing
  ```
  cd tests/MockAPIs
  ```
- The webserver configurations are added to the configuration file **playwright.config.js**

    ```
    webServer: {
        port: 9900,
        command: 'npm run start-Server',
    },
    ```
- Start the webserver by executing the **start-Server** script which is added in the package.json in this seed.
    ```
        "scripts": {
            "%*------------------------API Mocks---------------------------%*": "%*-----# API Mocking ----%*",
            "start-Server": "http-server -c-1 -p 9900 utils/demo-battery-api",
            "test-APIMocks": "npx playwright test",
        },
    ```
- Once the http-server is started, you can execute the test code examples in [**tests\MockAPIs\tests**](../../tests/MockAPIs/) directory.
    ```
    npx playwright test
    ```
- Once executions are complete, stop the http-server.

