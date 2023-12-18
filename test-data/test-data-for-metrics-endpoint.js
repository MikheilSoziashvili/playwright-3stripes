const apiUrl = process.env.DEV_API_URL + '/metrics-expose'

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

const paramsBody = {
    "leanixId": "0471d9c2-98e1-47ec-9597-f9d2471efbc4",
    "start": "2023-12-01T09:40:34.359Z",
    "end": "2023-12-05T14:59:34.359Z"
}

const paramsBodyDifferent = {
    "leanixId": "0471d9c2-98e1-47ec-9597-f9d2471efbc4",
    "start": "2023-12-01T09:40:34.359Z",
    "end": "2023-12-05T14:59:34.359Z"
  }

const positiveResponse = {
    "status": "success",
    "isPartial": false,
    "data": {
        "resultType": "matrix",
        "result": []
    }
}

const errorResponseWrong = "Invalid authentication credentials"

const errorResponseNone = "No API key found in request"

module.exports.apiUrl = apiUrl
module.exports.headerWithApiKey = headerWithApiKey
module.exports.headerWithoutApiKey = headerWithoutApiKey
module.exports.headerWithDifferentContentType = headerWithDifferentContentType
module.exports.headerWithWrongApiKey = headerWithWrongApiKey
module.exports.paramsBody = paramsBody
module.exports.paramsBodyDifferent = paramsBodyDifferent
module.exports.positiveResponse = positiveResponse
module.exports.errorResponseNone = errorResponseNone
module.exports.errorResponseWrong = errorResponseWrong