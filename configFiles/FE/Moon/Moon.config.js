// @ts-check
const { devices } = require("@playwright/test");
const { RPconfig } = require("../../../reportPortalProperties");
const { moonConfigs } = require("../../../resources/fe/moon/moonCapabilities");
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
  testIgnore: ["**/Kafka/**", "**/Component/**", "**/MockAPIs/**"],
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
    headless: false,
    screenshot: "only-on-failure", //Options - 'on','only-on-failure','off'
    video: "retain-on-failure", //Options - "off"|"on"|"retain-on-failure"|"on-first-retry"
  },

  /* Configure projects for major browsers */
  projects: [
    //Test on Moon
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
          //+`&pattern=`+`${moonConfigs.pattern}`                                 /** S3 bucker folder name - uncomment if  "enableVideoMoon" is set to true in moonConfigs*/
          //+`&videoName=chromium-moon-`+process.env.TEST_WORKER_INDEX+`.mp4`     /** Video recording will be saved with this name - uncomment if  enableVideoMoon is set to true */
        },
      },
    },

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
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "../../../test-results/",
};

module.exports = config;
