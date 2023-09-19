# v23.09.14

- Bumping up playwright jenkins agent version to 1.37.1
- Simplifying configuration files to reuse a single file for local and CI executions
- Updating documentation

# v23.08.13

- Kafka testing support: Demo examples - how to setup containers and test Kafka communications
- Addition of a new dockerized Playwright agent
- Example on how to incorporate testcontainers library
- Customization options to setup the seed based on you testing focus area (FE /BE / Kafka etc...). This will remove all unnecessary modules and setup a lean framework.

# v23.03.12

- **Capability addition** - You can now execute your mobile web tests on **Real Android devices on browserstack**. (Code example and documentation included in the seed)
- **Version Update**: The seed is using latest playwright version - **1.31.1**. Please note that Playwright version ^1.31.\* introduces breaking changes for **component tests**.

# v23.02.11

- Refactoring Code example for adidas PLP application

# v22.12.10

- Code improvements in page objects

# v22.12.09

Improvements:

- Faster Moon executions enabled by 'connectOptions' capability in config file.
- Refactoring BrowserStack fixtures for more scalability.
- Improvements in the project structure.

# v22.11.08

- Refactoring test examples - Parametrizing tests for reusability and readability in reports
- Improvements in folder structure
- Improvement in test data management
- Improvements in Moon and BS fixture configurations
- Updating all package.json dependencies to latest version
- # v22.11.07

- Adding allure reporting

# v22.10.06

- **Imp** - Vulnerability fixed with sonar package with the latest version. Please update.

# v22.10.05

### Changes

- Moon 2.0 Upgrade

# v22.09.04

### Changes

- Updating Moon ws endpoints.
- Test Steps included in Test Report Portal Launches.
- Global viewport configuration added in the default config file

# v22.08.03

### Changes

- API Mock examples

# v22.08.02

### Changes

- Addition of Mobile device emulation capability as a config file and supported with sample tests in the directory (tests\MobileDevice).
- Refactoring the BE tests to make them more maintainable.
- Contributed by Miguel from PLP team - Example on Mobile Viewport tests (tests\FE\examples\MicroFrontendHeader.spec.js)

# v22.08.01

Initially launched version.
