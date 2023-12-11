const apiUrl = process.env.DEV_API_URL + '/leanix'

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

const requestBody = {
    "query" : "c",
    "limit" : 10
}

const requestBodyWithLessLimit = {
    "query" : "c",
    "limit" : 5
}

const paramsBodyDifferent = {
    "date": 1698,
    "leanIxId": "1620"
}

const positiveResponse = {

}

const errorResponseWrong = {
    "message": "Invalid authentication credentials"
}

const errorResponseNone = {
    "message": "No API key found in request"
}

module.exports.apiUrl = apiUrl
module.exports.headerWithApiKey = headerWithApiKey
module.exports.headerWithoutApiKey = headerWithoutApiKey
module.exports.headerWithDifferentContentType = headerWithDifferentContentType
module.exports.requestBody = requestBody
module.exports.requestBodyWithLessLimit = requestBodyWithLessLimit
module.exports.headerWithWrongApiKey = headerWithWrongApiKey
module.exports.paramsBodyDifferent = paramsBodyDifferent
module.exports.positiveResponse = positiveResponse
module.exports.errorResponseNone = errorResponseNone
module.exports.errorResponseWrong = errorResponseWrong