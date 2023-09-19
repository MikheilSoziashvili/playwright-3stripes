const base = require('./browserStackBrowser')

const { nestedKeyValue,evaluateSessionStatus} = require('./../capabilities/browserStackCapabilities')

/**
 * Over-riding default context for browserstack projects
 */
exports.test = base.test.extend({
    context: async( { browserStackBrowser, context }, use, testInfo) => {
        if(testInfo.project.name.match(/browserstack/)){
            const browserStackContext = await browserStackBrowser.newContext();
            await use(browserStackContext);
    
            await browserStackContext.close();
        }
        else {
            await use(context);
        }

    },

    //for updating test results in Browser stack UI
    browserStackResult: async( { page}, use, testInfo) => {
        const testResult = {
            action: 'setSessionStatus',
            arguments: {
                status: evaluateSessionStatus(testInfo.status),
                reason: nestedKeyValue(testInfo, ['error', 'message'])
            },
        };

        //await use(testResult);
        await use(await page.evaluate(() => {},
        `browserstack_executor: ${JSON.stringify(testResult)}`));
    }
});

exports.expect = base.expect;