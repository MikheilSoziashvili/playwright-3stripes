# adidas Playwright js seed

## Introduction
Playwright is an end-to-end Test Automation framework. The adidas Playwright seed is a reference project to fast track test automation development for our engineering teams.

See the official [Playwright documentation here.](https://playwright.dev/)

## What can I test?

adidas Playwright seed can be used for testing:

- **FE Web Applications** (Desktop / Mobile)
- **BE APIs**
- **Kafka** communications between Producer and Consumer
- Additionally, can be used for **Mocking APIs / Visual comparison** etc.

### Note:

This seed is built using the Playwright test runner. For cucumber integration, please refer - [seed-tas-playwright-cucumber](https://bitbucket.tools.3stripes.net/projects/TE/repos/seed-tas-playwright-cucumber/browse).

This seed has been created by the **adidas Platform Engineering - Test Engineering** team. Please, don't hesitate to contact us for any information or clarification needed.

You can directly contact us through our Microsoft Teams channel [SUPPORT_TESTING](https://teams.microsoft.com/l/channel/19%3a9887ce8b989549f7ba468c80885926da%40thread.tacv2/SUPPORT_TESTING?groupId=9ebcbabe-a60f-4b1f-bf48-a51d799159f0&tenantId=3bfeb222-e42c-4535-aace-ea6f7751369b) or via email [pea.test_engineering@adidas.com](mailto:pea.test_engineering@adidas.com).

## Advantages of using this seed
- Integrated with adidas testing Platforms - **BrowserStack** and **Moon**
- Integrated with all testing tools - **XRAY, sonar, Report Portal, Jenkins etc**
- **Standard jenkins agent** compatible with the seed
- Maintained code examples
- Vulnerability scans 
- Multiple reporting options - **HTML report, Allure report, Junit Report, Test Reporting Portal**


## Important Note regarding XRAY
- With Playwright test runner, the test execution results can be linked to JIRA. This is achieved by exporting the junit report(as demonstrated in the pipeline example).
- However, unlike cucumber, with the Playwright test runner and junit we need to change a little the process in order to get full traceability. You can check detailed information [here](README/UserGuide/10-IntegrateXRAY.md). 


## Getting started
We have structured this project documentation based on these situations, providing step by step guidance for all of them:

- Staring version **v23.08.13**, we have added options to customize the project based on your testing target area (FE /BE..). Detailed further in the User Guide - [Getting Started and setting up a customised project](./README/UserGuide/00-ToGetStarted.md).
- To understand seed structure, supported capabilities and tools is integrated with [Content Guide](README/PlaywrightContentGuide.md)
- To create a new Test Automation Solution (TAS) from this seed, please go to [User Guide](README/PlaywrightUserGuide.md)
- Testing Kafka Communications - [Playwright + Kafka](./tests/Kafka/README.md)

## Resources 

- [Known issues](README/KnownIssues.md)
- [Contribution Guide](README/PlaywrightContributorGuide.md)
- [Changelog](README/ChangeLog.md)