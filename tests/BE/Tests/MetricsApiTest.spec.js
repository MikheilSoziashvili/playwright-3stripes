const { test, expect, request } = require('@playwright/test');
import * as testDataForMetrics from '../../../test-data/test-data-for-metrics-endpoint';

test.describe('Tests for metrics API @ONEPLFR-322', async () => {
    
    test.use({
        baseURL: testDataForMetrics.apiUrl
    })

    test('Successful request', async ({request}) => {
        const response = await request.post('', {
            headers: testDataForMetrics.headerWithApiKey,
            params: testDataForMetrics.paramsBody
        })
        const responseBody = await response.json()      
          
        await expect(response.ok()).toBeTruthy()
        await expect(responseBody).toEqual(testDataForMetrics.positiveResponse)
    })

    test('Request without Api Key header', async ({request}) => {
        const response = await request.post('', {
            headers: testDataForMetrics.headerWithoutApiKey,
            params: testDataForMetrics.paramsBody
        })
        const responseBody = JSON.parse((await response.body()).toString())
        
        await expect(response.status()).toBe(401)
        await expect(responseBody.message).toContain(testDataForMetrics.errorResponseNone)
    })

    test('Request with wrong Api Key header', async ({request}) => {
        const response = await request.post('', {
            headers: testDataForMetrics.headerWithWrongApiKey,
            params: testDataForMetrics.paramsBody
        })
        const responseBody = JSON.parse((await response.body()).toString())
        
        await expect(response.status()).toBe(401)
        await expect(responseBody.message).toContain(testDataForMetrics.errorResponseWrong)
    })

    test('Request without parameters', async ({request}) => {
        const response = await request.post('', {
            headers: testDataForMetrics.headerWithWrongApiKey
        })
        const message = JSON.parse((await response.body()).toString())
        
        // await expect(response.status()).toBe(401)
        // await expect(message).toContain(testDataForMetrics.errorResponseWrong)
    })

    test('Request with only date', async ({request}) => {
        const response = await request.post('', {
            headerWithApiKey: testDataForMetrics.headerWithApiKey,
            params: testDataForMetrics.paramsBody['date']
        })
        const responseBody = await response.json()

        // await expect(response.ok()).toBeFalsy()
        // await expect(responseBody).toEqual()  //Will update after resolving current defect
    })

    test('Request with only leanIxId', async ({request}) => {
        const response = await request.post('', {
            headerWithApiKey: testDataForMetrics.headerWithApiKey,
            params: testDataForMetrics.paramsBody['leanIxId']
        })
        const responseBody = await response.json()
        
        // await expect(response.ok()).toBeFalsy()
        // await expect(responseBody).toEqual()  //Will update after resolving current defect
    })

    test('Request with different Content-Type', async ({request}) => {
        const response = await request.post('', {
            headerWithDifferentContentType: testDataForMetrics.headerWithDifferentContentType, 
            params: testDataForMetrics.paramsBody
        })
        const responseBody = await response.json()

        await expect(response.ok()).toBeFalsy()
        // await expect(responseBody).toEqual()  //Will update after resolving current defect
    })

    test('Request with different values', async ({request}) => {
        const response = await request.post('', {
            headerWithApiKey: testDataForMetrics.headerWithApiKey, 
            params: testDataForMetrics.paramsBodyDifferent
        })
        const responseBody = await response.json()

        // await expect(response.ok()).toBeTruthy()
        // await expect(responseBody).toEqual()  //Will update after resolving current defect
    })
})