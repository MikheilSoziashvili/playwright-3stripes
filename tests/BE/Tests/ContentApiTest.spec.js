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
        const responseBody = await response.json()      
          
        await expect(response.ok()).toBeTruthy()

        // console.log(responseFromPresignedUrl.json())
    })
})