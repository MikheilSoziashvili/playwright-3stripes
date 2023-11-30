const { test, expect, request } = require('@playwright/test');
import * as testDataForContent from '../../../test-data/test-data-for-content-endpoint.js'

test.describe('Tests for content API @ONEPLFR-352', async () => {
    
    test.use({
        baseURL: testDataForContent.apiUrl,
    })

    test('Successful request, also Validating The response', async ({request}) => {
        const response = await request.get('', {
            headers: testDataForContent.headerWithApiKey
        })    
        const presignedUrl = JSON.parse((await response.body()).toString())
          
        await expect(response.ok()).toBeTruthy();
        await expect(presignedUrl).toContain(testDataForContent.positiveResponse)
    })

    test('Request without Api Key header', async ({request}) => {
        const response = await request.get('', {
            headers: testDataForContent.headerWithoutApiKey,
        })
        const message = JSON.parse((await response.body()).toString())
        
        await expect(response.status()).toBe(401)
        await expect(message).toContain(testDataForContent.errorResponseNone)
    })

    test('Request with wrong Api Key header', async ({request}) => {
        const response = await request.get('', {
            headers: testDataForContent.headerWithWrongApiKey,
        })
        const message = JSON.parse((await response.body()).toString())

        await expect(response.status()).toBe(401)
        await expect(message).toEqual(testDataForContent.errorResponseWrong)
    })

    
})