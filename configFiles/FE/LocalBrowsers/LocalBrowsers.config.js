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
];

const config = {
  testDir: "../../../tests/FE",
  testIgnore: ["**/Kafka/**", "**/Components/**", "**/MockAPIs/**"],
  /* Maximum time one test can run for. */
  timeout: 12 * 1000,

  expect: {
    timeout: 3000,
    
    toHaveScreenshot: { maxDiffPixels: 100 },
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
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
        launchOptions: {
          args: ["--start-maximized"]
      } 
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        launchOptions: {
          args: ["--start-maximized"]
        } 
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        launchOptions: {
          args: ["--start-maximized"]
        } 
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
