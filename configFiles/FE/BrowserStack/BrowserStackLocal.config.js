// @ts-nocheck
const { defineConfig, devices } = require("@playwright/test");
const { RPconfig } = require("../../../reportPortalProperties");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const reports = [
  ["list"],
  ["junit", { outputFile: "../../../reports/junit.xml" }],
  ["html", { outputFolder: "../../../reports/htmlReport", open: "never" }],
  [
    "allure-playwright",
    {
      detail: true, // set to false to hide before and after hooks
      outputFolder: "reports/allure-results",
      suiteTitle: true,
    },
  ],
];

module.exports = defineConfig({
  testDir: "../../../tests/FE",
  testIgnore: ["**/Kafka/**", "**/Components/**", "**/MockAPIs/**"],

  // Use globalSetup & globalTeardown only if browserstack.local = true
  globalSetup: require.resolve(
    "../../../resources/fe/browserstack/browserStack-Local/global-setup"
  ),

  globalTeardown: require.resolve(
    "../../../resources/fe/browserstack/browserStack-Local/global-teardown"
  ),

  /* Maximum time one test can run for. */
  timeout: 90 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 9000,
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
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    headless: process.env.CI ? true : false, //running headless in CI,
    screenshot: "only-on-failure", //Options - 'on','only-on-failure','off'
    video: "retain-on-failure", //Options - "off"|"on"|"retain-on-failure"|"on-first-retry"
  },

  /* Configure projects for major browsers */
  projects: [
    //Test on Browserstack
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
        // Config to use playwright emulated devices.
        // ...devices['iPhone 12 Pro Max'],
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "../../../test-results/",
});
