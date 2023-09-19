const base = require('@playwright/test');

const { caps, patchCaps, isHash, nestedKeyValue,evaluateSessionStatus, BS_LOCAL_ARGS, BrowserStackLocal} = require('./../capabilities/browserStackCapabilities');


/**
 * BrowserStack Browser fixture - to use directly in spec file, use - {browserStackBrowser}
 */
exports.test = base.test.extend({
    browserStackBrowser: async({ playwright, browser }, use, testInfo) => {
        if (testInfo.project.name.match(/browserstack/)) {
            patchCaps(testInfo.project.name, `${testInfo.file} - ${testInfo.title}`);
            const browserStackBrowser = await playwright.chromium.connect({
                wsEndpoint:
                `wss://cdp.browserstack.com/playwright?caps=` +
                `${encodeURIComponent(JSON.stringify(caps))}`,
            });

            await use(browserStackBrowser);

            await browserStackBrowser.close();

        }
        else {
          await use(browser);
        }
    }, 
});

exports.expect = base.expect;