// @ts-check
const { devices } = require('@playwright/test');


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */


const config = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 260 * 1000,
  
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 8000,

  },


  /* Reporter to use. See https://playwright.dev/docs/test-reporters */

  reporter: [ ['list']
              ,['html', { outputFolder: './reports/htmlReport' ,open: 'never'}]
              ,['junit', { outputFile: './reports/junit.xml' }]
              ,['allure-playwright', {
                detail: true,                                                       // set to false to hide before and after hooks
                outputFolder: './reports/allure-results',
                suiteTitle: true
              }]
            ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    //actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

  },

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: './test-results/',

};

module.exports = config;
