const nymera = require('./nymera')
const muckRack = require('./muckRock')
const muckRackAxios = require('./muckRockAxios')

const serviceFinder = {
    nymeraEmailByLinkedin: async (linkedinUrl) => {
        const response = await nymera.byLinkedinUrl(linkedinUrl)
        return response.data.emails
    },
    muckRackData: async (muckRackUrl) => {
        return await muckRack(muckRackUrl)
    },
    muckRackAxios: async (muckRackUrl) => {
        return await muckRackAxios(muckRackUrl)
    }
}

module.exports = serviceFinder