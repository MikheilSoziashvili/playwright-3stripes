const { test, expect } = require('@playwright/test');
import * as testDataForPlatforms from '../../../test-data/test-data-for-platforms-endpoint.js'

test.describe('Tests for Platforms API @ONEPLFR-352', async () => {
    
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

        for (const platform of responseBody.platforms) {
            await expect(platform).toHaveProperty('platformName');
            await expect(platform).toHaveProperty('platformKey');
            await expect(platform).toHaveProperty('platformArea');
            await expect(platform).toHaveProperty('description');
            await expect(platform).toHaveProperty('confluenceUrl');
            await expect(platform).toHaveProperty('tags');
            await expect(Array.isArray(platform.tags)).toBeTruthy();

            await expect(Array.isArray(platform.techStack)).toBeTruthy();
            for (const tech of platform.techStack) {
                await expect(tech).toHaveProperty('name');
                await expect(tech).toHaveProperty('logoUrl');
            }
        }
    })

    test('Request without api key in header', async ({request}) => {
        const response = await request.get('', {
            headers: testDataForPlatforms.headerWithoutApiKey
        })    
        const responseBody = await response.json();
          
        await expect(response.ok()).toBeFalsy();
        await expect(responseBody).toHaveProperty('message', testDataForPlatforms.errorResponseNone);
    })

    test('Request with wrong api key in header', async ({request}) => {
        const response = await request.get('', {
            headers: testDataForPlatforms.headerWithWrongApiKey
        })
        const responseBody = await response.json();
          
        await expect(response.ok()).toBeFalsy();
        await expect(responseBody).toHaveProperty('message', testDataForPlatforms.errorResponseWrong);
    })
})