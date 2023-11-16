const { expect } = require("@playwright/test");

class OnePlatformMainPage {

    constructor(page) {
        this.page = page;
        this.homeButton = page.locator('#home-button')

        this.navbarMiddle = page.locator('nav > div.header__middle > div > ul > li');

        this.myApplications = this.navbarMiddle.locator('#menu-item-my-applications');
        this.learningBase = this.navbarMiddle.locator('#menu-item-learning-base');
        this.systemStatus = this.navbarMiddle.locator('#menu-item-system-status');
        this.support = this.navbarMiddle.locator('#menu-item-support');
        this.packages = this.navbarMiddle.locator('#menu-item-packages');
        this.catalog = this.navbarMiddle.locator('#menu-item-catalog');
        this.community = this.navbarMiddle.locator('#menu-item-community');

        this.costs = page.locator('#menu-item-costs');
        this.ranking = page.locator('#menu-item-ranking');
        this.provisioning = page.locator('#menu-item-provisioning');

        this.onboarding = page.locator('#menu-item-onboarding')
        this.techStack = page.locator('#menu-item-tech-stack')
        this.templates = page.locator('#menu-item-templates')

        this.searchButtonNav = page.locator('#navbar-search-bar');
        this.searchButton = page.locator('#search-bar')
    }

    async goto() {
        await this.page.goto('http://oneplfr-dev.one-platform.deu02.eu-central-1.int.k8s.3stripes.net');
    }

    async verifyTitle() {
        await expect(this.page).toHaveTitle('adidas - Software Engineering');
    }

    async checkMainNavBarFunctionality() {
        const addresses = ['/my-applications', '/learning-base', '/system-status', '/support', '/packages', '/catalog', 'community']
        const navBarElements = [this.myApplications, this.learningBase, this.systemStatus, this.support, this.packages, this.catalog, this.community]

        for (let i = 0; i < navBarElements.length; i++) {
            await navBarElements[i].click();
        
            expect(this.page.url().endsWith(addresses[i])).toBeTruthy();

            await this.homeButton.click();
        }
    }

    async checkUnderMyApplications() {
        const addresses = ['/costs', '/ranking', '/provisioning']
        const navBarElements = [this.costs, this.ranking, this.provisioning]
        await this.myApplications.click()

        for (let i = 0; i < navBarElements.length; i++) {
            await navBarElements[i].click();
        
            expect(this.page.url().endsWith(addresses[i])).toBeTruthy();
            await this.homeButton.click();
        }
    }

    async checkUnderLearningBase() {
        const addresses = ['/onboarding', '/tech-stack', '/templates']
        const navBarElements = [this.onboarding, this.techStack, this.templates]
        await this.learningBase.click()

        for (let i = 0; i < navBarElements.length; i++) {
            await navBarElements[i].click();
        
            expect(this.page.url().endsWith(addresses[i])).toBeTruthy();
            await this.homeButton.click();
        }
    }

    async hoverOverLearning() {
            await this.myApplications.click();
            expect(this.costs).toBeVisible();

            await this.learningBase.hover();
            
            expect(this.onboarding).toBeVisible(); 
            await this.homeButton.click()
    }

    async hoverOverApplications() {
        await this.learningBase.click()
        expect(this.onboarding).toBeVisible()

        await this.myApplications.hover()
        
        expect(this.costs).toBeVisible()
        await this.homeButton.click()
    }

    async visibilityOfSearch() {
        expect(this.searchButtonNav).not.toBeVisible();
        expect(this.searchButton).toBeVisible();
        await this.myApplications.click();
        expect(this.searchButtonNav).toBeVisible();
        expect(this.searchButton).toBeVisible();
    }

    async functionalityOfNavSearch() {

    }

}
module.exports = { OnePlatformMainPage };