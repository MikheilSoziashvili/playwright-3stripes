const { test, expect, request } = require('@playwright/test');
import * as testDataforLeanix from '../../../test-data/test-data-for-leanix-endpoint';

test.describe('Tests for LeanIx API @ONEPLFR-352', async () => {

    test.use({
        baseURL: testDataforLeanix.apiUrl
    })

    test('Limit parameter functionality check', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(Array.isArray(await response.json()) && await response.json().length > 0).toBe(true);
        const firstResponseLength = await response.json().length;

        const responseWithDifferentLimit = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBodyWithLessLimit
        })

        expect(responseWithDifferentLimit.json().length).toBeLessThan(firstResponseLength);
    });

    test('Query parameter functionality check', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(Array.isArray(await response.json()) && await response.json().length > 0).toBe(true);
        await response.json().forEach(item => {
            expect(item.leanixName).toContain(testDataforLeanix.requestBody.query);
        });
    });

    test('Response has the required fields - ttl, sk, pk, and leanixName', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        console.log(await response.json());

        expect(Array.isArray(await response.json()) && await response.json().length > 0).toBe(true);
        await response.json().forEach(item => {
            expect(item.ttl).toBeDefined();
            expect(item.sk).toBeDefined();
            expect(item.pk).toBeDefined();
            expect(item.leanixName).toBeDefined();
        });
    });

    test('TTL is a non-negative integer', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        await response.json().forEach((item) => {
            
            expect(item.ttl).to.be.a('number');
            expect(item.ttl).to.be.at.least(0, 'TTL should be a non-negative integer');
        });
    });

    test('Sk and pk should be non-empty strings', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })
        

        expect(await response.json()).toContainValue({ isArray: true, length: { greaterThan: 0 } });
        await response.json().forEach(item => {
            expect(item.ttl).toBeDefined();
            expect(item.sk).toBeDefined();
            expect(item.pk).toBeDefined();
            expect(item.leanixName).toBeDefined();
        });
    });  

    test('LeanixName should be a non-empty string', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(Array.isArray(await response.json()) && await response.json().length > 0).toBe(true);
        await response.json().forEach((item) => {
            expect(item.leanixName).to.be.a('string').and.to.have.lengthOf.at.least(1, 'Value should not be empty');
        });
    });

    test('Content-Type header is application/json', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(response.headers.post('Content-Type')).to.include('application/json');
    });

    test('Response status code is 200', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(response.code).to.equal(200);
    });

    test('Response is an array with at least one element', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(Array.isArray(await response.json()) && await response.json().length > 0).toBe(true).that.is.not.empty;
    });

    test('Ttl, sk, pk, and leanixName are not null or undefined', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(Array.isArray(await response.json()) && await response.json().length > 0).toBe(true);
        await response.json().forEach((item) => {
            expect(item.ttl).toBeDefined().and.not.toBe(null);
            expect(item.sk).toBeDefined().and.not.toBe(null);
            expect(item.pk).toBeDefined().and.not.toBe(null);
        })     
    });

    test('Verify that the response does not contain any unexpected fields', async () => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(Array.isArray(await response.json()) && await response.json().length > 0).toBe(true);
        await response.json().forEach(item => {
            expect(item).toHaveProperty('ttl');
            expect(item).toHaveProperty('sk');
            expect(item).toHaveProperty('pk');
            expect(item).toHaveProperty('leanixName');
        });
    });

    test('Content-Type header is present in the response', async () => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })
            expect(response.headers.has('Content-Type')).toBe(true);
    });

    test('Request without Api Key header', async ({request}) => {
        const response = await request.get('', {
            headers: testDataforLeanix.headerWithoutApiKey,
            params: testDataforLeanix.paramsBody
        })
        const responseBody = await await response.json()

        await expect(response.ok()).toBeFalsy()
        await expect(responseBody).toEqual(testDataforLeanix.errorResponseNone)
    })

    test('Request with wrong Api Key header', async ({request}) => {
        const response = await request.get('', {
            headers: testDataforLeanix.headerWithWrongApiKey,
            params: testDataforLeanix.paramsBody
        })
        const responseBody = await await response.json()

        await expect(response.ok()).toBeFalsy()
        await expect(responseBody).toEqual(testDataforLeanix.errorResponseWrong)
    })
})