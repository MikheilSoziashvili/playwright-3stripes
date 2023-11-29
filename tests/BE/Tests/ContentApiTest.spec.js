const { test, expect, request } = require('@playwright/test');
import * as testDataForContent from '../../../test-data/test-data-for-content-endpoint';

test.describe('Tests for metrics-expose API @ONEPLFR-352', async () => {
    
    test.use({
        baseURL: testDataForContent.apiUrl
    })

    test('Successful request', async ({request}) => {
        const response = await request.get('', {
            headers: testDataForContent.headerWithApiKey
        })
        const responseBody = await response.json()      
          
        await expect(response.ok()).toBeTruthy()
        
        await expect(jsonPath(responseBody, "$.url")).to
    })

    test('Request without Api Key header', async ({request}) => {
        const response = await request.get('', {
            headers: testDataForContent.headerWithoutApiKey,
            params: testDataForContent.paramsBody
        })
        const responseBody = await response.json()

        // await expect(response.ok()).toBeFalsy()
        // await expect(responseBody).toEqual(testDataForContent.errorResponseNone)
    })

    test('Request with wrong Api Key header', async ({request}) => {
        const response = await request.get('', {
            headers: testDataForContent.headerWithWrongApiKey,
            params: testDataForContent.paramsBody
        })
        const responseBody = await response.json()

        // await expect(response.ok()).toBeFalsy()
        // await expect(responseBody).toEqual(testDataForContent.errorResponseWrong)
    })

    test('Request without parameters', async ({request}) => {
        const response = await request.get('', {
            headers: testDataForContent.headerWithWrongApiKey
        })
        const responseBody = await response.json()

        // await expect(response.ok()).toBeFalsy()
        // await expect(responseBody).toEqual()  //Will update after resolving current defect
    })

    test('Request with only date', async ({request}) => {
        const response = await request.get('', {
            headerWithApiKey: testDataForContent.headerWithApiKey,
            params: testDataForContent.paramsBody['date']
        })
        const responseBody = await response.json()

        // await expect(response.ok()).toBeFalsy()
        // await expect(responseBody).toEqual()  //Will update after resolving current defect
    })

    test('Request with only leanIxId', async ({request}) => {
        const response = await request.get('', {
            headerWithApiKey: testDataForContent.headerWithApiKey,
            params: testDataForContent.paramsBody['leanIxId']
        })
        const responseBody = await response.json()
        
        // await expect(response.ok()).toBeFalsy()
        // await expect(responseBody).toEqual()  //Will update after resolving current defect
    })

    test('Request with different Content-Type', async ({request}) => {
        const response = await request.get('', {
            headerWithDifferentContentType: testDataForContent.headerWithDifferentContentType, 
            params: testDataForContent.paramsBody
        })
        const responseBody = await response.json()

        await expect(response.ok()).toBeFalsy()
        // await expect(responseBody).toEqual()  //Will update after resolving current defect
    })

    test('Request with different values', async ({request}) => {
        const response = await request.get('', {
            headerWithApiKey: testDataForContent.headerWithApiKey, 
            params: testDataForContent.paramsBodyDifferent
        })
        const responseBody = await response.json()

        // await expect(response.ok()).toBeTruthy()
        // await expect(responseBody).toEqual()  //Will update after resolving current defect
    })
})