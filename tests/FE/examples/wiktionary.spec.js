const { test } = require('../../../resources/fe/browserstack/fixtures/browserStackPage');               /** Execution platform(Browserstack/Moon) fixtures */

const { expect } = require('@playwright/test');                                                         /** Importing assertion library */

const { WiktionaryPage } = require('../pageObjects/WiktionaryPage');                                    /** Importing page object */

const { TODO_ITEMS, todo_definition_map } = require("../../../test-data/wiktionary-test-data");         /** Importing Test Data */

/**Annotations added- @TED-24886 */
test.describe('Wiktionary FE Test @FE @TED-24886', () => {

    let wiktionaryPage;

    test.beforeEach(async ( {page} ) => {
        wiktionaryPage = new WiktionaryPage(page);
        await wiktionaryPage.goto();
    });
    
    /** Parameterizing tests for reuability. Test data imported from test-data/wiktionaryTestData.js file */
    for (const keyword of TODO_ITEMS){
        test(`Lookup Definition of ${keyword}`, async () => {

            await test.step("Verify WebPage Title", async () => {
                await expect(wiktionaryPage.verifyTitle()).toBeTruthy();
            });

            await test.step("Look up keyword definition", async () => {
                await wiktionaryPage.lookupKeyword(keyword);
            });

            await test.step("Verify keyword definition is appearing as expected", async () => {
                await expect(wiktionaryPage.actualSearchDefinition).toContainText(todo_definition_map.get(keyword));
            });
        });

    };
    //Not needed - already handled in defaultfixtures
    // test.afterEach(async ({ page }) => {
    //     await page.close();
    // });
});

