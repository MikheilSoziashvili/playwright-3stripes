# Known Issues

## #1 Firefox not working on Moon and BrowserStack - Fixed with Playwright seed version - v22.12.09
In jenkins executions firefox does not work on Moon and BrowserStack(PW Worker -firefox browser can be used instead)

## #2 Known vulnerability with Sonar-Scanner - Fixed with Playwright seed version v22.10.06
When you run **npm install**, it will show the message - 3 moderate severity vulnerabilities. This is a known issue and we are waiting for it to patched at the package level. Until then we taken the decision to allow but are continuously monitoring the vulnerability.

**Note - Vulnerability is fixed with the sonarqube-scanner version - 2.8.2.**

## #3 Moon-Chrome browser

Error while estabishing moon wsendpoint for 'chrome@moon' browser. This is being triaged and a possible workaround is using chromium browser or moon fixtures for chrome. Please reach out on SUPPORT_TESTING channel for any concerns around this.

