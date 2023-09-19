const { test } = require('../../../resources/fe/browserstack/fixtures/browserStackPage');               /** Execution platform(Browserstack/Moon) fixtures */

const { expect } = require('@playwright/test');                                                         /** Importing assertion library */

const { WiktionaryPage } = require('../pageObjects/WiktionaryPage');                                    /** Importing page object */

const { TODO_ITEMS } = require("../../../test-data/wiktionary-test-data");                              /** Importing Test Data */

test.describe('Visual Comparison @TED-25824', () => {

    let wiktionaryPage;

    test.beforeEach(async ( {page} ) => {
        wiktionaryPage = new WiktionaryPage(page);
        await wiktionaryPage.goto();
    });

    test('Compare full page Screenshots with base image of apple homepage @VisualComparison', async () => {

      await test.step("Verify WebPage Title", async () => {
        await expect(wiktionaryPage.verifyTitle()).toBeTruthy();
      });

      await test.step("Navigate to webpage for visual compariosn", async () =>{
        await wiktionaryPage.lookupKeyword(TODO_ITEMS[0]);
      });

      await test.step("Compare full page snapshot", async () => {
        await wiktionaryPage.fullPageSnapshot();
      });
    });

    test('Compare Screenshots of specific elements @VisualComparison', async ( ) => {

      await test.step("Verify WebPage Title", async () => {
        await expect(wiktionaryPage.verifyTitle()).toBeTruthy();
      });

      await test.step("Navigate to webpage for visual compariosn", async () =>{
        await wiktionaryPage.lookupKeyword(TODO_ITEMS[0]);
      });

      await test.step("Compare single element snapshot", async () => {
        await wiktionaryPage.specificElementSnapshot();
      });

    });

    test('Compare Screenshots with base image of apple homepage @VisualComparison', async () => {
      await test.step("Verify WebPage Title", async () => {
        await expect(wiktionaryPage.verifyTitle()).toBeTruthy();
      });

      await test.step("Navigate to webpage for visual compariosn", async () =>{
        await wiktionaryPage.lookupKeyword(TODO_ITEMS[0]);
      });

      await test.step("Compare WebPage snapshot with dimensions as current browser window size", async () => {
        await wiktionaryPage.currentWindowSizeSnapshot();
      });

    });
  
});

