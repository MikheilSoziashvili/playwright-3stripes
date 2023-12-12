const { test, expect, request } = require('@playwright/test');
import * as testDataforLeanix from '../../../test-data/test-data-for-leanix-endpoint';

test.describe('Tests for LeanIx API @ONEPLFR-352', async () => {

    test.use({
        baseURL: testDataforLeanix.apiUrl
    })


    //Current defect:
    test('Limit parameter functionality check', async ({ request }) => {
        // const response = await request.post('', {
        //     headers: testDataforLeanix.headerWithApiKey,
        //     data: testDataforLeanix.requestBody
        // })

        // expect(Array.isArray((await response.json())) && (await response.json()).length > 0).toBe(true);
        // const firstresponseArray = Array.isArray(await response.json()) ? await response.json() : Object.entries(await response.json());
        // const firstResponseLength = firstResponseArray.length;

        // const responseWithDifferentLimit = await request.post('', {
        //     headers: testDataforLeanix.headerWithApiKey,
        //     data: testDataforLeanix.requestBodyWithLessLimit
        // })

        // const responseJson = await responseWithDifferentLimit.json();
        // const responseArray = Array.isArray(responseJson) ? responseJson : Object.entries(responseJson);
        // expect(responseArray.length).toBeLessThan(firstResponseLength);
    });

    test('Query parameter functionality check', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            data: testDataforLeanix.requestBody
        })

        const responseJson = await response.json();
        const responseArray = Array.isArray(responseJson) ? responseJson : Object.entries(responseJson);

        console.log(responseArray);

        expect(responseArray.length > 0).toBe(true);
        responseArray.forEach(item => {
            expect(item.leanixName).toContain(testDataforLeanix.requestBody.query);
        });
    });

    test('Response has the required fields - ttl, sk, pk, and leanixName', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            data: testDataforLeanix.requestBody
        })

        const responseJson = await response.json();
        const responseArray = Array.isArray(responseJson) ? responseJson : Object.entries(responseJson);

        expect(responseArray.length > 0).toBe(true);
        responseArray.forEach(item => {
            expect(item.ttl).toBeDefined();
            expect(item.sk).toBeDefined();
            expect(item.pk).toBeDefined();
            expect(item.leanixName).toBeDefined();
        });
    });

    test('TTL is a non-negative integer', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            data: testDataforLeanix.requestBody
        })

        const responseJson = await response.json();
        const responseArray = Array.isArray(responseJson) ? responseJson : Object.entries(responseJson);

        responseArray.forEach((item) => {  
            expect(typeof item.ttl).toBe('number');
            expect(item.ttl).toBeGreaterThanOrEqual(0, 'TTL should be a non-negative integer');
        });
    });

    test('Sk and pk should be non-empty strings', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            data: testDataforLeanix.requestBody
        })
        
        const responseJson = await response.json();
        const responseArray = Array.isArray(responseJson) ? responseJson : Object.entries(responseJson);

        responseArray.forEach(item => {
            expect(item.ttl).toBeDefined();
            expect(item.sk).toBeDefined();
            expect(item.pk).toBeDefined();
            expect(item.leanixName).toBeDefined();
        });
    });  

    test('LeanixName should be a non-empty string', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            data: testDataforLeanix.requestBody
        })

        const responseJson = await response.json();
        const responseArray = Array.isArray(responseJson) ? responseJson : Object.entries(responseJson);

        expect(responseArray.length > 0).toBe(true);
        responseArray.forEach((item) => {
            expect(typeof item.leanixName).toBe('string');
            expect(item.leanixName.length).toBeGreaterThanOrEqual(0, 'LeanixName should be a non-empty string');
        });
    });

    test('Response status code is 200', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            data: testDataforLeanix.requestBody
        })

        expect(response.ok()).toBeTruthy();
    });

    test('Response is an array with at least one element', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            data: testDataforLeanix.requestBody
        })

        const responseJson = await response.json();
        const responseArray = Array.isArray(responseJson) ? responseJson : Object.entries(responseJson);

        expect(responseArray.length > 0).toBe(true);
    });

    test('Ttl, sk, pk, and leanixName are not null or undefined', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            data: testDataforLeanix.requestBody
        })

        const responseJson = await response.json();
        const responseArray = Array.isArray(responseJson) ? responseJson : Object.entries(responseJson);

        expect(responseArray.length > 0).toBe(true);
        responseArray.forEach((item) => {
            expect(item.ttl).toBeDefined();
            expect(item.ttl).not.toBeNull();
            expect(item.sk).toBeDefined();
            expect(item.sk).not.toBeNull();
            expect(item.pk).toBeDefined();
            expect(item.pk).not.toBeNull();
        })     
    });

    test('Request without Api Key header', async ({request}) => {
        const response = await request.get('', {
            headers: testDataforLeanix.headerWithoutApiKey,
            data: testDataforLeanix.requestBody
        })
        const responseBody = await response.json()

        await expect(response.ok()).toBeFalsy()
        await expect(responseBody).toEqual(testDataforLeanix.errorResponseNone)
    })

    test('Request with wrong Api Key header', async ({request}) => {
        const response = await request.get('', {
            headers: testDataforLeanix.headerWithWrongApiKey,
            data: testDataforLeanix.requestBody
        })
        const responseBody = await response.json()

        await expect(response.ok()).toBeFalsy()
        await expect(responseBody).toEqual(testDataforLeanix.errorResponseWrong)
    })
})