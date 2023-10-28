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
}

module.exports.testDataBE = testDataBE;
module.exports.sucessfulResponse = sucessfulResponse;
