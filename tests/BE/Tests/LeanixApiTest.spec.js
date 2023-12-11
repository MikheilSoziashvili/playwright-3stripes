const { test, expect, request } = require('@playwright/test');
import * as testDataforLeanix from '../../../test-data/test-data-for-leanix-endpoint';

test.describe('Tests for metrics-expose API @ONEPLFR-352', async () => {

    test.use({
        baseURL: testDataforLeanix.apiUrl
    })

    test('Limit parameter functionality check', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(response).to.be.an('array');
        const firstResponseLength = response.lengthOf

        const responseWithDifferentLimit = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBodyWithLessLimit
        })

        expect(responseWithDifferentLimit.length).toBe(firstResponseLength)
    });

    test('Query parameter functionality check', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(response).to.be.an('array');
        response.forEach(item => {
            expect(item.leanixName).toContain(testDataforLeanix.requestBody.query);
        });
    });

    test('Response has the required fields - ttl, sk, pk, and leanixName', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(response).to.be.an('array');
        response.forEach(item => {
            expect(item.ttl).to.exist;
            expect(item.sk).to.exist;
            expect(item.pk).to.exist;
            expect(item.leanixName).to.exist;
        });
    });

    test('TTL is a non-negative integer', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        response.forEach((item) => {
            expect(item.ttl).to.be.a('number');
            expect(item.ttl).to.be.at.least(0, 'TTL should be a non-negative integer');
        });
    });

    test('Sk and pk should be non-empty strings', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(response).to.be.an('array');
        response.forEach(item => {
            expect(item.sk).to.be.a('string').and.to.have.lengthOf.at.least(1, 'Value should not be empty');
            expect(item.pk).to.be.a('string').and.to.have.lengthOf.at.least(1, 'Value should not be empty');
        });
    });

    test('LeanixName should be a non-empty string', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(response).to.be.an('array');
        response.forEach((item) => {
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

        expect(response).to.be.an('array').that.is.not.empty;
    });

    test('Ttl, sk, pk, and leanixName are not null or undefined', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(response).to.be.an('array');
        response.forEach(function (item) {
            expect(item.ttl).to.exist.and.to.not.be.null;
            expect(item.sk).to.exist.and.to.not.be.null;
            expect(item.pk).to.exist.and.to.not.be.null;
            expect(item.leanixName).to.exist.and.to.not.be.null;
        });
    });

    test('Content-Type header is present in the response', async ({ request }) => {
        expect(response.headers.has('Content-Type')).to.be.true;
    });

    test('Verify that the response does not contain any unexpected fields', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(response).to.be.an('array').that.is.not.empty;
        response.forEach(item => {
            expect(item).to.have.all.keys('ttl', 'sk', 'pk', 'leanixName');
        });
    });

    test('Request without Api Key header', async ({request}) => {
        const response = await request.get('', {
            headers: testDataforLeanix.headerWithoutApiKey,
            params: testDataforLeanix.paramsBody
        })
        const responseBody = await response.json()

        await expect(response.ok()).toBeFalsy()
        await expect(responseBody).toEqual(testDataforLeanix.errorResponseNone)
    })

    test('Request with wrong Api Key header', async ({request}) => {
        const response = await request.get('', {
            headers: testDataforLeanix.headerWithWrongApiKey,
            params: testDataforLeanix.paramsBody
        })
        const responseBody = await response.json()

        await expect(response.ok()).toBeFalsy()
        await expect(responseBody).toEqual(testDataforLeanix.errorResponseWrong)
    })
})