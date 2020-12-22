const nymera = require('./nymera')

const serviceFinder = {
    nymeraEmailByLinkedin: async (linkedinUrl) => {
        return await nymera.byLinkedinUrl(linkedinUrl)
    }
}

module.exports = serviceFinder