const base = require('./browserStackContext');

const { nestedKeyValue,evaluateSessionStatus} = require('./../capabilities/browserStackCapabilities')

/**
 * Overriding default page in case of browserstack projects
 */
exports.test = base.test.extend({
    page: async( { context, page }, use, testInfo) => {
      if(testInfo.project.name.match(/browserstack/)){
        const browserStackPage = await context.newPage(testInfo.project.use);
        await use(browserStackPage);

        const testResult = {
          action: 'setSessionStatus',
          arguments: {
              status: evaluateSessionStatus(testInfo.status),
              reason: nestedKeyValue(testInfo, ['error', 'message'])
          },
        };

        await browserStackPage.evaluate(() => {},
        `browserstack_executor: ${JSON.stringify(testResult)}`);

        await browserStackPage.close();
      }
      else {
        await use(page);
      }


    },

});

exports.expect = base.expect;