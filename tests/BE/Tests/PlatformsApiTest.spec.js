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

    // Test for empty response
    test('Empty response', async ({request}) => {
        // Simulate an empty response
        const response = await request.get('/empty', {
            headers: testDataForPlatforms.headerWithApiKey
        })
        const responseBody = await response.json();
        // Check that the platforms array is empty
        await expect(responseBody.platforms).toEqual([]);
    })

    // Test for missing fields
    test('Missing fields', async ({request}) => {
        // Simulate a response with missing fields
        const response = await request.get('/missing-fields', {
            headers: testDataForPlatforms.headerWithApiKey
        })
        const responseBody = await response.json();
        // Check that the missing fields are undefined
        await expect(responseBody.platforms[0].platformName).toBeUndefined();
        await expect(responseBody.platforms[0].platformKey).toBeUndefined();
    })

    // Test for different data types
    test('Different data types', async ({request}) => {
        // Simulate a response with different data types
        const response = await request.get('/different-data-types', {
            headers: testDataForPlatforms.headerWithApiKey
        })
        const responseBody = await response.json();
        // Check that the data types are not as expected
        await expect(typeof responseBody.platforms).not.toBe('array');
        await expect(typeof responseBody.platforms[0].platformName).not.toBe('string');
    })
})