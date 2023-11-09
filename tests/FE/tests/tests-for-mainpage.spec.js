const { test } = require('@playwright/test');
const { OnePlatformMainPage } = require('../pageObjects/OnePlatformMainPage')

test.describe('One Platform main page functionalities @ONEPLFR-322', () => {

    let onePlfrMainPage;

    test.beforeEach(async ({ page }) => {
        onePlfrMainPage = new OnePlatformMainPage(page);
        await onePlfrMainPage.goto();
    })

    test('Verify page title', async () => {
        await onePlfrMainPage.verifyTitle();
    })

    test('Checking main navbar functionality', async () => {
        await onePlfrMainPage.checkMainNavBarFunctionality()
    })

    test('Checking navigation under - My Applications', async () => {
        await onePlfrMainPage.checkUnderMyApplications()
    })

    test('Checking navigation under - Learning Base', async () => {
        await onePlfrMainPage.checkUnderLearningBase()
    })

    test('Hovering over - Learning Base - while - My Applications is active', async () => {
        await onePlfrMainPage.hoverOverLearning()
    })

    test('Hovering over - My Applications - while - Learning Base is active', async () => {
        await onePlfrMainPage.hoverOverApplications()
    })
})