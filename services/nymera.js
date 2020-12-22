const axios = require('axios')

const nymeraUrl = process.env.NYMERA_URL
const nymeraKey = process.env.NYMERA_KEY
console.log(nymeraUrl, nymeraKey)
const nymeraClient = axios.create({
    baseURL: nymeraUrl,
    params: {
        api_key: nymeraKey,
    }
})

module.exports = {
    byLinkedinUrl: async (linkedinUrl) => {
        const params = {
            linkedin_url: linkedinUrl
        }
        const nymeraResponse = await nymeraClient.get('/', {params})
        console.log(nymeraResponse.data, 'nymera reaponse data')

        return nymeraResponse.data
    }
}