const { test, expect, request } = require('@playwright/test');
import { execSync } from 'child_process';
import testDataBE from '../../test-data/test-data-for-be';

test.describe('BE Test for data import @BE-All @ONEPLFR-168', () => {  

    test.use({
        baseURL: 'https://reqres.in'
    });

    test('Get a single existing users @BE-GET', async ({ request }) => {

        // tools.aws.withMfaAuthentication(awsCredentials, awsMfaCredentials) {

        // const response = await request.get(`/api/users/${testDataBE}`); 
        // const responseBody = await response.json();

        await test.step('Upload Object to S3', async () => {
            console.log(`aws s3api put-object --bucket '${testDataBE.AWS_S3_BUCKET}' --key '${testDataBE.AWS_S3_DESTINATION}' --body '${testDataBE.PATH_TO_UPLOAD_FILE}'`)
            // execSync(`aws s3api put-object --bucket '${testDataBE.AWS_S3_BUCKET}' --key '${testDataBE.AWS_S3_DESTINATION}' --body '${testDataBE.PATH_TO_UPLOAD_FILE}'`, {encoding: 'utf-8'});
        })
          
        await test.step('Check victoria metrics database', async () => {
            // await expect(responseBody).toEqual(testDataBE.responseSingleExistingUser);
        });

        await test.step('Remove object from S3', async () => {
            // execSync(`aws s3api delete-object --bucket '${testDataBE.AWS_S3_BUCKET}' --key '${testDataBE.AWS_S3_DESTINATION}'`, {encoding: 'utf-8'});
        });

    });
});





