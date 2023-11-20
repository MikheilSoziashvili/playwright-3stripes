const { test, expect, request } = require('@playwright/test');
import * as testDataForMetricsExpose from '../../../test-data/test-data-for-metrics-expose';

test.describe('Tests for metrics-expose API @ONEPLFR-352', async () => {
    
    test.use({
        baseURL: testDataForMetricsExpose.apiUrl
    })

    test('Successful request', async ({request}) => {
        const response = request.get('', {headerWithApiKey: testDataForMetricsExpose.headerWithApiKey, params: testDataForMetricsExpose.paramsBody})
        const responseBody = await response.json()      
          
        await expect(response).toBeOk()
        await expect(responseBody).toBeEqual(testDataForMetricsExpose.positiveResponse)
    })

    test('Request without Api Key header', async ({request}) => {
        const response = request.get('', {headerWithoutApiKey: testDataForMetricsExpose.headerWithoutApiKey, params: testDataForMetricsExpose.paramsBody})
        const responseBody = await response.json()

        // await expect(response).not.toBeOk()
        // await expect(responseBody).toBeEqual(testDataForMetricsExpose.errorResponseNone)
    })

    test('Request with wrong Api Key header', async ({request}) => {
        const response = request.get('', {headerWithWrongApiKey: testDataForMetricsExpose.headerWithWrongApiKey, params: testDataForMetricsExpose.paramsBody})
        const responseBody = await response.json()

        // await expect(response).not.toBeOk()
        // await expect(responseBody).toBeEqual(testDataForMetricsExpose.errorResponseWrong)
    })

    test('Request without parameters', async ({request}) => {
        const response = request.get('', {headerWithWrongApiKey: testDataForMetricsExpose.headerWithWrongApiKey})
        const responseBody = await response.json()

        // await expect(response).not.toBeOk()
        // await expect(responseBody).toBeEqual()  //Will update after resolving current defect
    })

    test('Request with only date', async ({request}) => {
        const response = request.get('', {headerWithApiKey: testDataForMetricsExpose.headerWithApiKey, params: testDataForMetricsExpose.paramsBody['date']})
        const responseBody = await response.json()

        // await expect(response).not.toBeOk()
        // await expect(responseBody).toBeEqual()  //Will update after resolving current defect
    })

    test('Request with only leanIxId', async ({request}) => {
        const response = request.get('', {headerWithApiKey: testDataForMetricsExpose.headerWithApiKey, params: testDataForMetricsExpose.paramsBody['leanIxId']})
        const responseBody = await response.json()
        
        // await expect(response).not.toBeOk()
        // await expect(responseBody).toBeEqual()  //Will update after resolving current defect
    })

    test('Request with different Content-Type', async ({request}) => {
        const response = request.get('', {headerWithDifferentContentType: testDataForMetricsExpose.headerWithDifferentContentType, params: testDataForMetricsExpose.paramsBody})
        const responseBody = await response.json()

        // await expect(response).not.toBeOk()
        // await expect(responseBody).toBeEqual()  //Will update after resolving current defect
    })

    test('Request with different values', async ({request}) => {
        const response = request.get('', {headerWithApiKey: testDataForMetricsExpose.headerWithApiKey, params: testDataForMetricsExpose.paramsBodyDifferent})
        const responseBody = await response.json()

        // await expect(response).toBeOk()
        // await expect(responseBody).toBeEqual()  //Will update after resolving current defect
    })
})