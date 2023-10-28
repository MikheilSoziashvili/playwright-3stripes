// @ts-nocheck
// @ts-ignore
const { defineConfig, devices } = require("@playwright/test");

const { RPconfig } = require("./reportPortalProperties");
const { moonConfigs } = require("./resources/fe/moon/moonCapabilities");
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config();

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */

const reports = [
  ["list"],
  ["junit", { outputFile: "../../reports/junit.xml" }],
  ["html", { outputFolder: "../../reports/htmlReport", open: "never" }],
  [
    "allure-playwright",
    {
      detail: true, // set to false to hide before and after hooks
      outputFolder: "reports/allure-results",
      suiteTitle: true,
    },
  ],
];

const config = {
  testDir: "./tests",
  testIgnore: ["**/Kafka/**", "**/Component/**", "**/MockAPIs/**"],
  /* Maximum time one test can run for. */
  timeout: 120 * 1000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 16000,
    //Visual Comparison
    toHaveScreenshot: { maxDiffPixels: 100 },
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /** Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [...reports, ["@reportportal/agent-js-playwright", RPconfig]]
    : reports,

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    actionTimeout: 9000,
    trace: "on-first-retry",

    headless: process.env.CI ? true : false,

    screenshot: "only-on-failure",
    video: "off",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },

    {
      name: "chrome@latest:Windows 10@browserstack",
      use: {
        browserName: "chromium",
        channel: "chrome",
      },
    },
    {
      name: "chrome@latest-beta:OSX Big Sur@browserstack",
      use: {
        browserName: "chromium",
        channel: "chrome",
      },
    },
    {
      name: "edge@90:Windows 10@browserstack",
      use: {
        browserName: "chromium",
      },
    },
    {
      name: "playwright-firefox@latest:OSX Catalina@browserstack",
      use: {
        browserName: "firefox",
        ignoreHTTPSErrors: true,
      },
    },
    {
      name: "playwright-webkit@latest:OSX Big Sur@browserstack",
      use: {
        browserName: "webkit",
      },
    },
    /** Moon Browsers */
    {
      name: "chromium@moon",
      use: {
        browserName: "chromium",
        channel: "chrome",
        connectOptions: {
          wsEndpoint:
            `wss://moon.testing.aws.3stripes.net/playwright/chromium/playwright-` +
            `${moonConfigs.playwrightVersion}` +
            `?name=` +
            `${moonConfigs.projectNameMoon}` +
            `&headless=` +
            `${moonConfigs.headlessMoon}` +
            `&enableVideo=` +
            `${moonConfigs.enableVideoMoon}`,
        },
      },
    },
    /**{
      name: 'chrome@moon',
      use: {
        browserName: 'chromium',
        channel: 'chromium',
        slomo: 19000,
        timeout: 60000,
        connectOptions: {wsEndpoint: `wss://moon.testing.aws.3stripes.net/playwright/chrome/playwright-`+`${moonConfigs.playwrightVersion}`
        +`?name=`+`${moonConfigs.projectNameMoon}`
        +`&headless=`+`${moonConfigs.headlessMoon}`
        +`&enableVideo=`+`${moonConfigs.enableVideoMoon}`,}
      },
    },
    */
    {
      name: "firefox@moon",
      use: {
        browserName: "firefox",
        ignoreHTTPSErrors: true,
        connectOptions: {
          wsEndpoint:
            `wss://moon.testing.aws.3stripes.net/playwright/firefox/playwright-` +
            `${moonConfigs.playwrightVersion}` +
            `?name=` +
            `${moonConfigs.projectNameMoon}` +
            `&headless=` +
            `${moonConfigs.headlessMoon}` +
            `&enableVideo=` +
            `${moonConfigs.enableVideoMoon}`,
        },
      },
    },
    {
      name: "webkit@moon",
      use: {
        browserName: "webkit",
        ignoreHTTPSErrors: true,
        connectOptions: {
          wsEndpoint:
            `wss://moon.testing.aws.3stripes.net/playwright/webkit/playwright-` +
            `${moonConfigs.playwrightVersion}` +
            `?name=` +
            `${moonConfigs.projectNameMoon}` +
            `&headless=` +
            `${moonConfigs.headlessMoon}` +
            `&enableVideo=` +
            `${moonConfigs.enableVideoMoon}`,
        },
      },
    },
    /*Viewports
    {
      name: "safari",
      use: {
        browserName: "webkit",
        viewport: { width: 1200, height: 750 },
      },
    },
    {
      name: "firefox",
      use: {
        browserName: "firefox",
        viewport: { width: 800, height: 600 },
      },
    },
    

    
    /* Test on emulated mobile devices. 
    Refer: 'configFiles/FE/MobileDeviceEmulation/MobileDevices.config.js' for more details*/
    {
      name: "Mobile Chrome",
      testMatch: /.*wiktionaryMobile.spec.js/,
      use: {
        ...devices["Pixel 5"],
      },
    },
    {
      name: "Mobile Safari",
      testMatch: /.*wiktionaryMobile.spec.js/,
      use: {
        ...devices["iPhone 12"],
      },
    },
    /**Test on real Android devices in BrowserStack. Devices to be specified in capabilities - resources\fe\browserstack\beta_realAndroidDevices\capabilities.js*/
    {
      name: "Android-Beta-BrowserStack",
      testMatch: /.*Beta.spec.js/,
      retries: 0,
    },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "test-results/",
};

module.exports = config;
