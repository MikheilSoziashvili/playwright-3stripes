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
];

const config = {
  testDir: "../../tests/BE/Tests",
  testIgnore: ["**/Kafka/**", "**/Components/**"],

  timeout: 60 * 1000,

  expect: {

    timeout: 5000,
  },

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: process.env.CI
    ? [...reports, ["@reportportal/agent-js-playwright", RPconfig]]
    : reports,

  use: {
    trace: "on-first-retry",
  },

  outputDir: "../../test-results/",
};

module.exports = config;
