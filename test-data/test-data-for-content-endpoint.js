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

const headerWithDifferentContentType = {
    'Content-Type': 'application/xml',
    'Api-Key': 'wrongApiKey'
}

const positiveResponse = {
    "url": ""
}

const errorResponseWrong = {
    "message": "Invalid authentication credentials"
}

const errorResponseNone = {
    "message": "No API key found in request"
}

const validFileContent = {

}

module.exports.apiUrl = apiUrl
module.exports.headerWithApiKey = headerWithApiKey
module.exports.headerWithoutApiKey = headerWithoutApiKey
module.exports.headerWithDifferentContentType = headerWithDifferentContentType
module.exports.headerWithWrongApiKey = headerWithWrongApiKey
module.exports.positiveResponse = positiveResponse
module.exports.errorResponseNone = errorResponseNone
module.exports.errorResponseWrong = errorResponseWrong