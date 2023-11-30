const { test, expect, request } = require('@playwright/test');
import * as testDataForContent from '../../../test-data/test-data-for-content-endpoint.js'

test.describe('Tests for content API @ONEPLFR-352', async () => {
    
    test.use({
        baseURL: testDataForContent.apiUrl,
        // headers: testDataForContent.headerWithApiKey
    })

    test('Successful request', async ({request}) => {
        const response = await request.get('', {
            headers: testDataForContent.headerWithApiKey
        })      
          
        await expect(response.ok()).toBeTruthy();
        await expect(response.json().url.includes('.s3.') && response.url.includes('amazonaws.com')).toBeTruthy();
    })
})