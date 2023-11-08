const { expect } = require("@playwright/test");

class OnePlatformMainPage {

    constructor(page) {
        this.page = page;
        this.homeButton = this.page.locator('home-button')

        this.navbarMiddle = page.locator('nav > div.header__middle > div > ul > li');

        this.myApplications = this.navbarMiddle.locator('#menu-item-my-applications');
        this.learningBase = this.navbarMiddle.locator('#menu-item-learning-base');
        this.systemStatus = this.navbarMiddle.locator('#menu-item-system-status');
        this.support = this.navbarMiddle.locator('#menu-item-support');
        this.packages = this.navbarMiddle.locator('#menu-item-packages');
        this.catalog = this.navbarMiddle.locator('#menu-item-catalog');
        this.community = this.navbarMiddle.locator('#menu-item-community');

        this.costs = this.page.locator('menu-item-costs');
        this.ranking = this.page.locator('menu-item-ranking');
        this.provisioning = this.page.locator('menu-item-provisioning');

        this.onboarding = this.page.locator('menu-item-onboarding')
        this.onboarding = this.page.locator('menu-item-tech-stack')
        this.onboarding = this.page.locator('menu-item-templates')

        this.searchButton = page.locator('#navbar-search-bar');
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
            await this.page.waitForNavigation();
        
            expect(this.page.url().endsWith(addresses[i])).toBeTruthy();

            await this.homeButton.click();
            await this.page.waitForNavigation();
        }
    }

    async checkUnderMyApplications() {
        const addresses = ['/costs', '/ranking', '/provisioning']
        const navBarElements = [this.costs, this.ranking, this.provisioning]

        for (let i = 0; i < navBarElements.length; i++) {
            await navBarElements[i].click();
            await this.page.waitForNavigation();
        
            expect(this.page.url().endsWith('/my-applications' + addresses[i])).toBeTruthy();

            await this.homeButton.click();
            await this.page.waitForNavigation();
        }
    }

    async checkUnderLearningBase() {
        const addresses = ['/onboarding', '/tech-stack', '/templates']
        const navBarElements = [this.costs, this.ranking, this.provisioning]

        for (let i = 0; i < navBarElements.length; i++) {
            await navBarElements[i].click();
            await this.page.waitForNavigation();
        
            expect(this.page.url().endsWith('/learning-base' + addresses[i])).toBeTruthy();

            await this.homeButton.click();
            await this.page.waitForNavigation();
        }
    }

    async hoverSwitchCheck(navBarElement) {
        if (navBarElement == this.myApplications.textContent()) {
            await this.myApplications.click()
            expect(this.costs).toBeVisible()

            await this.learningBase.hover()
            await this.learningBase.waitForSelector()
            
            expect(this.costs).toBeVisible()
        } else if (navBarElement == this.learningBase.textContent()) {
            await this.learningBase.click()
            expect(this.onboarding).toBeVisible()

            await this.myApplications.hover()
            await this.myApplications.waitForSelector()
        
            expect(this.onboarding).toBeVisible()
        }
    }

    
}
module.exports = { OnePlatformMainPage };