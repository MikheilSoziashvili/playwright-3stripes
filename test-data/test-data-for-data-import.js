const apiUrl = process.env.VICTORIA_DB_URL;

const headers = {
    'Authorization': 'Basic ' + Buffer.from(process.env.VICTORIA_DB_USERNAME + ":" + process.env.VICTORIA_DB_PASSWORD, 'utf-8').toString('base64'),
    'api-key': process.env.VICTORIA_DB_APIKEY
};

const testDataBE = {
    PATH_TO_UPLOAD_FILE :  __dirname + '/upload_files/cost.csv',
    AWS_PROFILE : 'svc_oneplfr',
	AWS_S3_BUCKET: 'oneplfr-inbound-dev',
	AWS_S3_DESTINATION: 'inbound/cost.csv'
}

const sucessfulResponse = {
    "status": "success",
    "isPartial": false,
    "data": {
        "resultType": "vector",
        "result": []
    }
};

module.exports.apiUrl = apiUrl;
module.exports.headers = headers;
module.exports.testDataBE = testDataBE;
module.exports.sucessfulResponse = sucessfulResponse;