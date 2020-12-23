const sheetModel = require('../models/googleSheet')
const serviceFinder = require('../services/index')
const sendMail = require('../services/mailSender')

exports.retrieveUsers = async (req, res) => {
    const spreadsheetId = req.query.sheetId
    const ownerEmail = req.query.email
    try {
        const sheetData = await sheetModel.getAll(spreadsheetId)
        res.send('ok')
        
        for(let i = 0; i < 20; i++){
            const updatedData = {}
            let linkedin = sheetData[i].LinkedIn
            const email = sheetData[i].Email
            const linkedinData = linkedin ? await serviceFinder.nymeraEmailByLinkedin(linkedin) : false
            const muckRackData = sheetData[i]['Muck Rack'] ? await serviceFinder.muckRackAxios(sheetData[i]['Muck Rack']) : false

            if(!linkedin && muckRackData.linkedin) {
                updatedData.LinkedIn = muckRackData.linkedin
                linkedin = muckRackData.linkedin
            }

            if (linkedinData || muckRackData) {
                if (muckRackData.email) {
                    updatedData.Email = muckRackData.email
                } else if (linkedinData.length > 0) {
                    updatedData.Email = linkedinData[0].email
                }

                if (muckRackData.topic) updatedData.Topic = muckRackData.topic
                if (muckRackData.jobTitle) updatedData.JobTitle = muckRackData.jobTitle
                if (muckRackData.email && muckRackData.email !== email) {
                    updatedData.Email = muckRackData.email
                }
            }

            const result = {
                ...sheetData[i],
                ...updatedData,
            }
            const updateResult = await sheetModel.getById(spreadsheetId, i + 2, result)
            console.log(updateResult, 'result')
        }
        console.log('end')
        sendMail(ownerEmail)
    } catch (e) {
        console.log(e, '---error---')
    }
}
