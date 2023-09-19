const { expect } = require("@playwright/test");

class WiktionaryPage {

    //Locators - Locator can be created with the page.locator(selector[, options]) method.
    constructor(page) {
        this.page = page;
        this.searchField = page.locator('#searchInput:visible'); //CSS - :visible only works with CSS
        this.searchButton = page.locator('#searchButton'); //CSS
        this.actualSearchDefinition = page.locator('body');
        this.searchImage = page.locator('#mw-content-text > div.mw-parser-output > div.thumb.tright > div > a > img >> nth=0'); // >> nth=0 for first image
        this.firstHeading = page.locator('#firstHeading:visible'); 
        //Lazy Images
        this.copyrightImage = page.locator('#footer-copyrightico > a > img');
        this.poweredbyImage = page.locator('#footer-poweredbyico > a > img');
    }


    async goto() {
        await this.page.goto('https://en.wiktionary.org/wiki/Wiktionary:Main_Page');
    }

    async verifyTitle(){
        await expect(this.page).toHaveTitle('Wiktionary, the free dictionary');
    }

    async lookupKeyword(keyword){
        await this.searchField.fill(keyword);
        await this.searchButton.click();
    }

    //Waiting for all lazy images to load for Visual comparison
    async lazyImageLoading(){
        //Kick off loading
        await this.copyrightImage.scrollIntoViewIfNeeded();
        await this.poweredbyImage.scrollIntoViewIfNeeded();
        // wait for the images to finish loading
        await this.copyrightImage.evaluate(image => image.complete || new Promise(f => image.onload = f));
        await this.poweredbyImage.evaluate(image => image.complete || new Promise(f => image.onload = f));
    }

    async fullPageSnapshot(){
        this.lazyImageLoading();
        await expect(await this.page.screenshot({fullPage: true})).toMatchSnapshot('BaseImageFullPage.png');
        //Alternate
        //await expect(page).toHaveScreenshot('BaseImage.png',{ maxDiffPixels: 100 });
        //expect(await expect(page).toHaveScreenshot({fullPage: true}));
    }

    async specificElementSnapshot(){
        const elementScreenshot = await this.searchImage.screenshot();
        await expect(elementScreenshot).toMatchSnapshot('elementScreenshot.png');

    }
    
    async currentWindowSizeSnapshot(){
        await expect(this.page).toHaveScreenshot('BaseImage.png',{ maxDiffPixels: 100 });
    }
    

}
module.exports = { WiktionaryPage };