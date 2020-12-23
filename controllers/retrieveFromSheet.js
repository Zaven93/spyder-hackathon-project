const sheetModel = require('../models/googleSheet')
const serviceFinder = require('../services/index')

// const ifUpdateUser = (users) => {
//     for (let i = 0; i < users.length; i++) {}
// }


exports.retrieveUsers = async (req, res) => {
    const spreadsheetId = req.query.sheetId
    try {
        const sheetData = await sheetModel.getAll(spreadsheetId)
        const muckRackData = await serviceFinder.muckRackAxios(sheetData[18]['Muck Rack'])
        
        for(let i = 0; i < 1; i++){
            const updatedData = {}
            const linkedin = sheetData[i].LinkedIn
            const email = sheetData[i].Email

            console.log(sheetData[i]['Muck Rack'])

            const linkedinData = linkedin ? await serviceFinder.nymeraEmailByLinkedin(linkedin) : false
            const muckRackData = sheetData[i]['Muck Rack'] ? await serviceFinder.muckRackAxios(sheetData[i]['Muck Rack']) : false

            if(!linkedin && muckRackData.linkedin) updatedData.LinkedIn = muckRackData.linkedin
            if (linkedinData || muckRackData) {
                if (muckRackData.email) {
                    updatedData.Email = muckRackData.email
                } else if (linkedinData.length > 0) {
                    updatedData.Email = linkedinData[0].email
                }

                if (muckRackData.topic) updatedData.Topic = muckRackData.topic
                if (muckRackData.jobTitle) updatedData.JobTitle = muckRackData.jobTitle
                else if (muckRackData.email && muckRackData.email !== email) {

                }
            }

            const result = {
                ...sheetData[i],
                ...updatedData,
            }
            try{
                const updateResult = await sheetModel.getById(spreadsheetId, i + 2, result)
                console.log(updateResult, 'result')
            } catch (e) {
                console.log(e, 'updateError')
            }
        }
    } catch (e) {
        console.log(e, '---error---')
    }
}
