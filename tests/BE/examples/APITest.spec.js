const { test, expect, request } = require('@playwright/test');

/**
 * Importing test data
 */
var testDataBE = require('../../../test-data/example-BE-test-data.js')


test.describe('BE Tests using playwright @BE-All @TED-25836', () => {

    /** 
     * Setting base url for the tests.
     * Alternately, base URL and authorization(if required) can be setup in the config files.
     * */    

    test.use({
        baseURL: 'https://reqres.in'
    });

    /** Get request using "request" built in playwright fixture */
    test('Get a single existing users @BE-GET', async ({ request }) => {

        const response = await request.get(`/api/users/${testDataBE.GET_USER_BY_ID}`); 
        const responseBody = await response.json();

        await test.step('Validate response code', async () => {
            await expect(response.ok()).toBeTruthy(); //ok()- Contains a boolean stating whether the response was successful (status in the range 200-299) or not., toBeTruthy() - when you don't care what a value is and you want to ensure a value is true in a boolean context. 
        })
          
        await test.step('Validate response body', async () => {
            await expect(responseBody).toEqual(testDataBE.responseSingleExistingUser);
        });

        await test.step('Validate userID is correct in response body', async () => {
            await expect(responseBody.data.id.toString()).toEqual(testDataBE.GET_USER_BY_ID);
        });
        

    });

    test('Get user list @BE-GET', async({ request }) =>{
        const response = await request.get(`api/users?page=${testDataBE.GET_USER_LIST_BY_PAGE_NO}`);

        await test.step('Validate response code', async () => {
            await expect(response.ok()).toBeTruthy();
        });

        await test.step('Validate response body', async () => {
            await expect(await response.json()).toEqual(expect.objectContaining(testDataBE.userList));
        });
    });


    test('Single user not found @BE-GET', async({ request }) => {
        const response = await request.get(`api/users/${testDataBE.GET_INVALID_USER_ID}`);

        await test.step('Validate response code', async () => {
            await expect(response.ok()).toBeFalsy();
        });

    });

    //Post
    test('Create single user @BE-POST', async({ request }) => {
        const response = await request.post('/api/users', testDataBE.createSingleUser);
        const responseBody = await response.json();

        await test.step('Validate response code', async () => {
            await expect(response.ok()).toBeTruthy();
        });

        await test.step('Verify response ID is not Null', async () => {
            await expect(responseBody.id).not.toBeNull();
        })

    });

    //PUT
    test('Update existing user PUT @BE-PUT', async({ request }) => {
        const response = await request.put(`/api/users/${testDataBE.UPDATE_USER_WITH_ID}`, testDataBE.updateUser);
        const responseBody = await response.json();
        
        await test.step('Validate response code', async () => {
            await expect(response.ok()).toBeTruthy();
        });

    });

    //PATCH
    test('Update existing user PATCH @BE-PATCH', async({ request }) => {
        const response = await request.patch(`/api/users/${testDataBE.UPDATE_USER_WITH_ID}`, testDataBE.updateUser);

        await test.step('Validate response code', async () => {
            await expect(response.ok()).toBeTruthy();
        });
    });

    
    //DELETE
    test('Delete existing user @BE-DELETE', async({ request }) => {
        const response = await request.delete(`/api/users/${testDataBE.DELETE_USER_ID}`);

        await test.step('Validate response code', async () => {
            await expect(response.ok()).toBeTruthy();
        });
    });
});





