1. For headed execution:

    npx playwright test --headed

2. Run all the tests

    npx playwright test

3. Run a single test file

    npx playwright test tests/FE/examples/wiktionary.spec.js

4. Run a set of test files

    npx playwright test tests/FE/examples/wiktionary.spec.js tests/FE/examples/microFrontendHeader.spec.js

5. Run files that have my-spec or my-spec-2 in the file name

    npx playwright test my-spec my-spec-2

6. Run the test with the title

    npx playwright test -g "Wiktionary FE Test"

7. Run tests in a particular configuration (project)

    npx playwright test --project=firefox

8. Disable parallelization

    npx playwright test --workers=1

9. Choose a reporter

    npx playwright test --reporter=dot

10. Run in debug mode with Playwright Inspector

    npx playwright test --debug

11. Ask for help

    npx playwright test --help
