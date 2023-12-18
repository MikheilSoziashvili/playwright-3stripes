const { test, expect } = require('@playwright/test');
import * as testDataForPlatforms from '../../../test-data/test-data-for-platforms-endpoint.js'

test.describe('Tests for platforms API', async () => {
    
    test.use({
        baseURL: testDataForPlatforms.apiUrl,
    })

    test('Successful request, also Validating The response', async ({request}) => {
        const response = await request.get('', {
            headers: testDataForPlatforms.headerWithApiKey
        })    
        const responseBody = await response.json();
          
        await expect(response.ok()).toBeTruthy();
        await expect(responseBody).toHaveProperty('platforms');
        await expect(Array.isArray(responseBody.platforms)).toBeTruthy();
        await expect(responseBody.platforms[0]).toHaveProperty('platformName', 'Fast Insights Platform');
        await expect(responseBody.platforms[0]).toHaveProperty('platformKey', 'FIP');
        await expect(responseBody.platforms[0]).toHaveProperty('platformArea', 'Cloud Native Engineering');
        await expect(responseBody.platforms[0]).toHaveProperty('description', 'Some description PROD');
        await expect(responseBody.platforms[0]).toHaveProperty('confluenceUrl', 'https://clonfuence.url/prod');
        await expect(Array.isArray(responseBody.platforms[0].tags)).toBeTruthy();
        await expect(responseBody.platforms[0].tags).toContain('PROD');
        await expect(responseBody.platforms[0].tags).toContain('ONEPLFR');
        await expect(Array.isArray(responseBody.platforms[0].techStack)).toBeTruthy();
        await expect(responseBody.platforms[0].techStack[0]).toHaveProperty('name', 'aws');
    })

    test('Request without api key in header', async ({request}) => {
        const response = await request.get('', {
            headers: testDataForPlatforms.headerWithoutApiKey
        })    
        const responseBody = await response.json();
          
        await expect(response.ok()).toBeFalsy();
        await expect(responseBody).toHaveProperty('error', testDataForPlatforms.errorResponseNone);
    })

    test('Request with wrong api key in header', async ({request}) => {
        const response = await request.get('', {
            headers: testDataForPlatforms.headerWithWrongApiKey
        })
        const responseBody = await response.json();
          
        await expect(response.ok()).toBeFalsy();
        await expect(responseBody).toHaveProperty('error', testDataForPlatforms.errorResponseWrong);
    })
})