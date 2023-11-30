const pathToFile = '/undefined/frontend-item-info.json'
const apiUrl = process.env.DEV_API_URL + '/content' + pathToFile

const headerWithApiKey = {
    'Content-Type': 'application/json',
    'Api-Key': process.env.DEV_API_KEY
}

const headerWithoutApiKey = {
    'Content-Type': 'application/json',
}

const headerWithWrongApiKey = {
    'Content-Type': 'application/json',
    'Api-Key': 'wrongApiKey'
}

const positiveResponse = "https://oneplfr-platforms-content-dev.s3.eu-central-1.amazonaws.com"

const errorResponseWrong = "Invalid authentication credentials"

const errorResponseNone = "No API key found in request"

const validFileContent = {

}

module.exports.apiUrl = apiUrl
module.exports.headerWithApiKey = headerWithApiKey
module.exports.headerWithoutApiKey = headerWithoutApiKey
module.exports.headerWithWrongApiKey = headerWithWrongApiKey
module.exports.positiveResponse = positiveResponse
module.exports.errorResponseNone = errorResponseNone
module.exports.errorResponseWrong = errorResponseWrong