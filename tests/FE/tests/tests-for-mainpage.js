const { test, expect, request } = require('@playwright/test');
const { OnePlatformMainPage } = require('../pageObjects/OnePlatformMainPage')

test.describe('One Platform main page functionalities @ONEPLFR-322', () => {

    let onePlfrMainPage;

    test.beforeAll(async ( {page} ) => {
        onePlfrMainPage = new OnePlatformMainPage(page);
        await onePlfrMainPage.goto()
    })

    test('Verify page title', async () => {
        await onePlfrMainPage.verifyTitle()
    })

    test('Validating functionality of navigation bar', async () => {

        await test.step('Checking main navbar functionality', async () => {
            await onePlfrMainPage.checkMainNavBarFunctionality()
        })

        await test.step('Checking navigation under - My Applications', async () => {
            await onePlfrMainPage.checkUnderMyApplications()
        })

        await test.step('Checking navigation under - Learning Base', async () => {
            await onePlfrMainPage.checkUnderLearningBase()
        })

        await test.step('Hovering over - Learning Base - while - My Applications is active', async () => {
            await onePlfrMainPage.hoverSwitchCheck('My Applications')
        })

        await test.step('Hovering over - My Applications - while - Learning Base is active', async () => {
            await onePlfrMainPage.hoverSwitchCheck('Learning Base')
        })
    })

})