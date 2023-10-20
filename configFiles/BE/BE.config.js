// @ts-nocheck
const { devices } = require("@playwright/test");
const { RPconfig } = require("../../reportPortalProperties");
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */

//@ts-ignore
const reports = [
  ["list"],
  ["junit", { outputFile: "../../reports/junit.xml" }],
  ["html", { outputFolder: "../../reports/htmlReport", open: "never" }],
  // [
  //   "allure-playwright",
  //   {
  //     detail: true, // set to false to hide before and after hooks
  //     outputFolder: "reports/allure-results",
  //     suiteTitle: true,
  //   },
  // ],
];
const config = {
  testDir: "../../tests/BE",
  testIgnore: ["**/Kafka/**", "**/Components/**"],
  /* Maximum time one test can run for. */
  timeout: 60 * 1000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 8000,
  },

  /* Fail the build on CI if you accidentally left test.only in the source code. */
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
    //actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "../../test-results/",
};

module.exports = config;
