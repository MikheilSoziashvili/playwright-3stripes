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

        expect(Array.isArray(response) && response.length > 0).toBe(true);
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

        expect(Array.isArray(response) && response.length > 0).toBe(true);
        response.forEach(item => {
            expect(item.leanixName).toContain(testDataforLeanix.requestBody.query);
        });
    });

    test('Response has the required fields - ttl, sk, pk, and leanixName', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(Array.isArray(response) && response.length > 0).toBe(true);
        response.forEach(item => {
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

        expect(response).toContainValue({ isArray: true, length: { greaterThan: 0 } });
        response.forEach(item => {
            expect(item.ttl).toBeDefined();
            expect(item.sk).toBeDefined();
            expect(item.pk).toBeDefined();
            expect(item.leanixName).toBeDefined();
        });

        test('TTL is a non-negative integer', async ({ request }) => {
            const response = await request.post('', {
                headers: testDataforLeanix.headerWithApiKey,
                body: testDataforLeanix.requestBody
            })

            response.forEach((item) => {
                expect(item.ttl).toBeType('number');
                expect(item.ttl).toBeGreaterThanOrEqual(0);
            });
        });

        test('Sk and pk should be non-empty strings', async ({ request }) => {
            const response = await request.post('', {
                headers: testDataforLeanix.headerWithApiKey,
                body: testDataforLeanix.requestBody
            })

            expect(response).toContainValue({ isArray: true, length: { greaterThan: 0 } });
            response.forEach(item => {
                expect(item.sk).toBeType('string');
                expect(item.sk).not.toHaveLength(0);
                expect(item.pk).toBeType('string');
                expect(item.pk).not.toHaveLength(0);
            });
        });

        test('LeanixName should be a non-empty string', async ({ request }) => {
            const response = await request.post('', {
                headers: testDataforLeanix.headerWithApiKey,
                body: testDataforLeanix.requestBody
            })

            expect(response).toContainValue({ isArray: true, length: { greaterThan: 0 } });
            response.forEach((item) => {
                expect(item.leanixName).toBeType('string');
                expect(item.leanixName).not.toHaveLength(0);
            });
        });
    });

    test('LeanixName should be a non-empty string', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(Array.isArray(response) && response.length > 0).toBe(true);
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

        expect(Array.isArray(response) && response.length > 0).toBe(true).that.is.not.empty;
    });

    test('Ttl, sk, pk, and leanixName are not null or undefined', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(Array.isArray(response) && response.length > 0).toBe(true);
        response.forEach(function (item) {
            expect(item.ttl).toBeDefined().and.not.toBe(null);
            expect(item.sk).toBeDefined().and.not.toBe(null);
            expect(item.pk).toBeDefined().and.not.toBe(null);
            
            
    test('Response is an array with at least one element', async () => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(Array.isArray(response) && response.length > 0).toBe(true);
    });

    test('Ttl, sk, pk, and leanixName are not null or undefined', async () => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(Array.isArray(response) && response.length > 0).toBe(true);
        response.forEach(function (item) {
            expect(item.ttl).toBeDefined();
            expect(item.ttl).not.toBeNull();
            expect(item.sk).toBeDefined();
            expect(item.sk).not.toBeNull();
            expect(item.pk).toBeDefined();
            expect(item.pk).not.toBeNull();
            expect(item.leanixName).toBeDefined();
            expect(item.leanixName).not.toBeNull();
        });
    });

    test('Content-Type header is present in the response', async () => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })
        expect(response.headers.has('Content-Type')).toBe(true);
    });

    test('Verify that the response does not contain any unexpected fields', async () => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(Array.isArray(response) && response.length > 0).toBe(true);
        response.forEach(item => {
            expect(item).toHaveProperty('ttl');
            expect(item).toHaveProperty('sk');
            expect(item).toHaveProperty('pk');
            expect(item).toHaveProperty('leanixName');
        });
    });

    test('Response is an array with at least one element', async () => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(Array.isArray(response) && response.length > 0).toBe(true);
    });

    test('Ttl, sk, pk, and leanixName are not null or undefined', async () => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
                    body: testDataforLeanix.requestBody
                })

        expect(Array.isArray(response) && response.length > 0).toBe(true);
        response.forEach(function (item) {
            expect(item.ttl).toBeDefined();
            expect(item.ttl).not.toBeNull();
            expect(item.sk).toBeDefined();
            expect(item.sk).not.toBeNull();
            expect(item.pk).toBeDefined();
            expect(item.pk).not.toBeNull();
            expect(item.leanixName).toBeDefined();
            expect(item.leanixName).not.toBeNull();
        });
    });

        test('Content-Type header is present in the response', async () => {
            const response = await request.post('', {
                headers: testDataforLeanix.headerWithApiKey,
                body: testDataforLeanix.requestBody
            })
            expect(response.headers.has('Content-Type')).toBe(true);
        });

        test('Verify that the response does not contain any unexpected fields', async () => {
            const response = await request.post('', {
                headers: testDataforLeanix.headerWithApiKey,
                body: testDataforLeanix.requestBody
            })

            expect(Array.isArray(response) && response.length > 0).toBe(true);
            response.forEach(item => {
                expect(item).toHaveProperty('ttl');
                expect(item).toHaveProperty('sk');
                expect(item).toHaveProperty('pk');
                expect(item).toHaveProperty('leanixName');
            });
        });    expect(item.leanixName).toBeDefined().and.not.toBe(null);
        });
    });

    test('Content-Type header is present in the response', async ({ request }) => {
        expect(response.headers.has('Content-Type')).toBe(true);
    });

    test('Verify that the response does not contain any unexpected fields', async ({ request }) => {
        const response = await request.post('', {
            headers: testDataforLeanix.headerWithApiKey,
            body: testDataforLeanix.requestBody
        })

        expect(Array.isArray(response) && response.length > 0).toBe(true).that.is.not.empty;
        response.forEach(item => {
            expect(item).toHaveProperty('ttl');
            expect(item).toHaveProperty('sk');
            expect(item).toHaveProperty('pk');
            expect(item).toHaveProperty('leanixName');
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