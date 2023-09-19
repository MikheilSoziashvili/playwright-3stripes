# 05. Testing On Mobile Devices - Emulating Mobile devices

Playwright comes with a registry of device parameters for selected mobile devices. It can be used to simulate browser behavior on a mobile device. 
Please find the info on supported devices [here.](https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json)

## 5.1 Configuration File Capabilities

1. Project Matrix contains project setting for Playwright browsers, Browserstack and moon browsers.
2. To emulate a specific supported device, specify the device name in the required project in the matrix, e.g. the below will emulate Pixel 5 on Playwright Chrome browser:
```
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
```
3. Sample config file: [configFiles/FE/MobileDeviceEmulation/MobileDevices.config.js](../../configFiles/FE/MobileDeviceEmulation/MobileDevices.config.js)
4. Examples covered in this seed can be referred in the test directory - [tests/MobileDevice-Emulation](../../tests/MobileDevice-Emulation)

Running tests on Real android devices 12-Run Mobile Web tests on [Real Android Devices](12-Experimental-RealAndroidDevices)

Continue to the next section - [06-API Testing](06-BeTests.md).

