# 12. Executing tests on Real Android devices on BrowserStack

(Added in  v23.03.12)

Please note that playwright currently provides **Experimental** support for Android real device automation. This includes Chrome for Android and Android WebView.

In the seed, we provide integration with the BrowserStack to run your tests on real Android devices. Currently, this is a Beta Capability offered by BrowserStack.

## 12.1 Example in this seed

Demo example in the seed - [tests\RealAndroid-BSBeta](../../tests/RealAndroid-BSBeta).

You can execute the tests using the CLI Command:

```
npx playwright test --project='Android-Beta-BrowserStack'
```

OR use the test script from package.json:
```
npm run test-RealAndroid
```
## 12.2 Setup and Configurations

1. Test Project(Global Config File):
    - Example config file - [configFiles\FE\RealAndroidDevice\RealAndroid.config.js](../../configFiles/FE/RealAndroidDevices/RealAndroid.config.js). Can be customised as required.
    - The below test project is available in the default config and well as the jenkins config files. Customise it as per your requirements.
        ```
        {
          name: 'Android-Beta-BrowserStack',
          testMatch: /.*Beta.spec.js/,
          retries: 0,
        },
        ```

2. Capabilities and Fixtures:
    - The folder [resources\fe\browserstack\beta_realAndroidDevices](../../resources/fe/browserstack/beta_realAndroidDevices) contains **capabilities** and **fixtures** required to execute tests on real android devices on BrowserStack.
    - By default tests will be executed on the device - **Samsung Galaxy S22 Ultra**. For executing on different devices, you can update the capabilities in the file [resources\fe\browserstack\beta_realAndroidDevices\capabilities.js](../../resources/fe/browserstack/beta_realAndroidDevices/capabilities.js). 
    - Please refer the **References** section below for information on supported android devices.

## 12.3 To execute tests on BrowserStack:

- Set BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY as environment variable:
    ```
    #Windows
    set BROWSERSTACK_USERNAME=[YOUR BROWSERSTACK USERNAME]
    set BROWSERSTACK_ACCESS_KEY=[BROWSERSTACK_ACCESS_KEY]

    #Mac - Linux
    export BROWSERSTACK_USERNAME=[YOUR BROWSERSTACK USERNAME]
    export BROWSERSTACK_ACCESS_KEY=[YOUR BROWSERSTACK ACCESS KEY]

    ```
- In spec.js file, import required fixture: 
```
  const { test } = require('../../../resources/fe/browserstack/beta_realAndroidDevices/fixtures');
```
- To update execution status in BrowserStack UI:
```
    test.afterEach(async({ updateResultInUI }) =>{
      await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify(updateResultInUI)}`);
    });
```

The above configurations will allow you to run tests on real android device on BrowserStack! ✨

- The test execution can be seen in **BrowserStack Automate.**

## 12.4 References

Check out the list of supported Android devices on BrowserStack - [Supported Devices](https://www.browserstack.com/list-of-browsers-and-platforms/playwright)

Official Playwright documentation:
 - https://playwright.dev/docs/api/class-android.
 - https://playwright.dev/docs/api/class-androiddevice
 - https://playwright.dev/docs/api/class-androidinput
 - https://playwright.dev/docs/api/class-androidsocket
 - https://playwright.dev/docs/api/class-androidwebview

Continue to the next section - [13-Kafka testing using Playwright seed](13-KafkaTesting.md).