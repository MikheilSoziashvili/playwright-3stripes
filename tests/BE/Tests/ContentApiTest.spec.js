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
        const responseBody = JSON.parse(await response.body().toString())
          
        await expect(response.ok()).toBeTruthy();
        await expect(responseBody.url).toContain(testDataForContent.positiveResponse)

        const getFolderFromPresignedUrl = request.get(responseBody.url, {
            headers: testDataForContent.headerWithApiKey
        })

        const responseFromPresignedUrl = JSON.parse(await response.body().toString())
        console.log(responseFromPresignedUrl)
        await expect(responseFromPresignedUrl).toContainEqual(testDataForContent.positiveContentFromPresignedUrl)
    })

    test('Request without Api Key header', async ({request}) => {
        const response = await request.get('', {
            headers: testDataForContent.headerWithoutApiKey,
        })
        const responseBody = JSON.parse((await response.body()).toString())
        
        await expect(response.status()).toBe(401)
        await expect(responseBody.message).toContain(testDataForContent.errorResponseNone)
    })

    test('Request with wrong Api Key header', async ({request}) => {
        const response = await request.get('', {
            headers: testDataForContent.headerWithWrongApiKey,
        })
        const responseBody = JSON.parse((await response.body()).toString())

        await expect(response.status()).toBe(401)
        await expect(responseBody.message).toEqual(testDataForContent.errorResponseWrong)
    })    
})