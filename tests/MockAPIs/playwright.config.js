// @ts-check

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type{import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  webServer: {
    port: 9900,
    command: 'npm run start-Server',
  },
  // Test directory
  testDir: './tests',
};
module.exports = config;