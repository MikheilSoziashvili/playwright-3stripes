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
    "date": 16980424320,
    "leanIxId": "16980424320"
}

const paramsBodyDifferent = {
    "date": 1698,
    "leanIxId": "1620"
}

const positiveResponse = {
    "status": "success",
    "isPartial": false,
    "data": {
        "resultType": "vector",
        "result": [
            {
                "metric": {},
                "value": [
                    9223372036.854,
                    "16980424320"
                ]
            }
        ]
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