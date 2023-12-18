const apiUrl = process.env.DEV_API_URL + '/platforms/'

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

const errorResponseWrong = "Invalid authentication credentials"

const errorResponseNone = "No API key found in request"

module.exports.apiUrl = apiUrl
module.exports.headerWithApiKey = headerWithApiKey
module.exports.headerWithoutApiKey = headerWithoutApiKey
module.exports.headerWithWrongApiKey = headerWithWrongApiKey
module.exports.errorResponseNone = errorResponseNone
module.exports.errorResponseWrong = errorResponseWrong