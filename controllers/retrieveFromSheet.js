const authentication = require('../google/index')
const { google } = require('googleapis')
const sheetModel = require('../models/googleSheet')
const serviceFinder = require('../services/index')

// const ifUpdateUser = (users) => {
//     for (let i = 0; i < users.length; i++) {}
// }

exports.retrieveUsers = async (req, res) => {
    const spreadsheetId = req.query.sheetId
    try {
        const data = await sheetModel.getAll(spreadsheetId)

        for(let i = 10; i < 20; i++){
            const linkedin = data[i].LinkedIn
            const email = data[i].Email
            if(linkedin) {
                const nymeraEmail = await serviceFinder.nymeraEmailByLinkedin(linkedin)
                console.log(i, '--nymeraEmail', nymeraEmail)
                console.log(i, '--email', email)
                // if(nymeraEmail) 
            }
        }
        console.log(data[0], 'response date')
    } catch (e) {
        console.log(e, '---error---')
    }
}

exports.checkUser = async (req, res) => {
    const spreadsheetId = req.query.sheetId
    const metadataN = req.query.metadataN

    await sheetModel.getById(spreadsheetId)
}
