const { test, expect, request } = require('@playwright/test');
import { execSync } from 'child_process';
import testDataBE, { sucessfulResponse } from '../../test-data/test-data-for-be';

const apiUrl = process.env.VICTORIA_DB_URL;
const headers = {
    'Authorization': 'Basic ' + Buffer.from(process.env.VICTORIA_DB_USERNAME + ":" + process.env.VICTORIA_DB_PASSWORD, 'utf-8').toString('base64'),
    'api-key': process.env.VICTORIA_DB_APIKEY
};

test.describe('BE Test for data import Plan @ONEPLFR-168', () => {  
    
    test.use({
        baseURL: apiUrl
    })

    test('Test for Data import', async ({ request }) => {
        const uploadCommand = `aws s3api put-object --bucket '${testDataBE.AWS_S3_BUCKET}' --key '${testDataBE.AWS_S3_DESTINATION}' --body '${testDataBE.PATH_TO_UPLOAD_FILE}'`
        const deleteCommand = `aws s3api delete-object --bucket '${testDataBE.AWS_S3_BUCKET}' --key '${testDataBE.AWS_S3_DESTINATION}'`
       
        const response = await request.get('', {
            headers: {
                'api-key': headers['api-key'],
                'Accept': 'application/json',
                'Authorization': headers.Authorization
            }
        }); 

        const responseBody = await response.json();

        await test.step('Upload Object to S3', async () => {
            execSync(uploadCommand, {encoding: 'utf-8'})
        });
          
        await test.step('Check victoria metrics database', async () => {
            expect(responseBody).toEqual(testDataBE.sucessfulResponse)

        });

        await test.step('Remove object from S3', async () => {
            execSync(deleteCommand, {encoding: 'utf-8'});
        });

    });
});




