# 3. Run Front End on Browser Stack
(RealAndroid- added in v23.03.12)

The seed is configured to run tests on BrowserStack and BrowserStack-Local. Under [resources/fe/browserstack](../../resources/fe/browserstack/) you can find all browserstack related files:

- resources\fe\
  - browserstack\
    - beta_realAndroidDevices
      - capabilities
      - fixtures
    - browserStack-Local\
      - global-setup.js               -> setup file for Browserstack Local
      - global-teardown.js            -> TearDown file for Browserstack Local
    - capabilities
      - browserStackCapabilities.js   -> BrowserStack Capabilities
    - fixtures                        -> BrowserStack {browser}, {context} and {page} fixtures, import as required in spec.js file
      - browserStackBrowser           
      - browserStackContext
      - browserStackPage


## 3.1 To execute tests on BrowserStack:
- Set BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY as environment variable:
    ```
    #Windows
    set BROWSERSTACK_USERNAME=[YOUR BROWSERSTACK USERNAME]
    set BROWSERSTACK_ACCESS_KEY=[BROWSERSTACK_ACCESS_KEY]

    #Mac - Linux
    export BROWSERSTACK_USERNAME=[YOUR BROWSERSTACK USERNAME]
    export BROWSERSTACK_ACCESS_KEY=[YOUR BROWSERSTACK ACCESS KEY]

    ```
- In spec.js file, import required fixture and Playwright Test runner will take care of executing test accordingly.
  
  1. Example from [tests/FE/examples/wiktionary.spec.js](../../tests/FE/examples/wiktionary.spec.js)
  ```
  const { test } = require('../../../resources/fe/browserstack/fixtures/browserStackPage');  
    .
    .
    test.beforeEach(async ( {page} ) => {..} );        
  ```

Note: If you are using BrowserStackContext fixture in the test file, specify the below to update execution status in BrowserStack UI.

```
  test.afterEach(async ({ browserStackResult }, testInfo) => {
    if(testInfo.project.name.match(/browserstack/)){
      await browserStackResult;
    }
  });
```
## 3.2 To execute tests on BrowserStack-Local

In addition to the above setting, for executing on BrowserStack-Local, set BROWSERSTACK_LOCAL as true.

```
#Windows
set BROWSERSTACK_LOCAL=true

#Mac - Linux
export BROWSERSTACK_LOCAL=true

```

## 3.3 Parallel execution on all specified BrowserStack projects

```
npx playwright test --config=./configFiles/FE/BrowserStack/BrowserStack.config.js
```
For BrowserStack local, use config File: [configFiles/FE/BrowserStack/BSlocal.config.js](../../configFiles/FE/BrowserStack/BSlocal.config.js)

## 3.4 Execution on specific BrowserStack Browsers

### Chrome

```
npx playwright test --config=./configFiles/FE/BrowserStack/BrowserStack.config.js --project='chrome@latest-beta:OSX Big Sur@browserstack','chrome@latest:Windows 10@browserstack'
```

### Firefox

```
npx playwright test --config=./configFiles/FE/BrowserStack/BrowserStack.config.js --project='playwright-firefox@latest:OSX Catalina@browserstack'
```

### Edge

```
npx playwright test --config=./configFiles/FE/BrowserStack/BrowserStack.config.js --project='edge@90:Windows 10@browserstack'
```

## Webkit

```
npx playwright test --config=./configFiles/FE/BrowserStack/BrowserStack.config.js --project='playwright-webkit@latest:OSX Big Sur@browserstack'
```


Continue to the next section - [04-Visual Comparison Using Playwright](04-VisualTesting.md).