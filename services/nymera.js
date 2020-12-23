const axios = require('axios')

const nymeraUrl = process.env.NYMERA_URL
const nymeraKey = process.env.NYMERA_KEY

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

        return nymeraResponse.data
    }
}