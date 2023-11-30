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
        const presignedUrl = JSON.parse((await response.body()).toString())
        console.log(presignedUrl.url)
        // await expect(response.json().url).toContain(".s3.eu-central-1.amazonaws.com");
    })
})