const { test, expect, request } = require('@playwright/test');
import * as testDataForMetricsExpose from '../../../test-data/test-data-for-metrics-expose';

test.describe('Tests for metrics-expose API @ONEPLFR-352', async () => {
    
    test.use({
        baseURL: testDataForMetricsExpose.apiUrl
    })

    test('Successful request', async ({request}) => {
        const response = await request.get('', {
            headers: testDataForMetricsExpose.headerWithApiKey,
            params: testDataForMetricsExpose.paramsBody
        })
        const responseBody = await response.json()      
          
        await expect(response.ok()).toBeTruthy()
        
        await expect(responseBody).toEqual(testDataForMetricsExpose.positiveResponse)
    })
})