// @ts-nocheck
const { devices } = require("@playwright/test");
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

const config = {
  testDir: "../../../tests/FE",
  testIgnore: ["**/Kafka/**", "**/Components/**", "**/MockAPIs/**"],
  /* Maximum time one test can run for. */
  timeout: 120 * 1000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 8000,
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
    //Playwright workers
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
    */
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "../../../test-results/",
};

module.exports = config;
