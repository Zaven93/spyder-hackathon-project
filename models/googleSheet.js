const authentication = require('../google/index')
const { google } = require('googleapis')

const sheets = async () => {
    const auth = await authentication.authenticated()
    const sheetsClient = await google.sheets({ version: 'v4', auth })

    return sheetsClient
}


const sheetModel = {
    getAll: async (spreadsheetId) => {
        const sheetsClient = await sheets()

        return new Promise((success, failed) => {
            // const sheets = google.sheets({ version: 'v4', auth })
            console.log(sheets, 'sheets in model')
            sheetsClient.spreadsheets.values.get(
                {
                    fields: sheetsClient.properties,
                    spreadsheetId: spreadsheetId,
                    range: 'A:G'
                },
                (err, res) => {
                    if (err) {
                        return failed(err)
                    }
                    const rows = res.data.values
    
                    // format retrieved data
                    if (rows.length) {
                        var rowHead = rows.shift()
                        const formatedUsers = rows.map((row) => {
                            return rowHead.reduce((obj, key, i) => {
                                obj[key] = row[i]
                                return obj
                            }, {})
                        })
                        success(formatedUsers)
                    } else {
                        failed('No data found.')
                    }
                }
            )
        })
    },

    getById: async (spreadsheetId, metadataId) => {
        const sheetsClient = await sheets()

        // return new Promise((success, failed) => {
        //     // const sheets = google.sheets({ version: 'v4', auth })
        //     console.log(sheets, 'sheets in model')
        //     sheetsClient.spreadsheets.values.get(
        //         {
        //             spreadsheetId: spreadsheetId,
        //             range: 'A:G'
        //         },
        //         (err, res) => {
        //             if (err) {
        //                 return failed(err)
        //             }
        //             const rows = res.data.values
    
        //             // format retrieved data
        //             if (rows.length) {
        //                 var rowHead = rows.shift()
        //                 const formatedUsers = rows.map((row) => {
        //                     return rowHead.reduce((obj, key, i) => {
        //                         obj[key] = row[i]
        //                         return obj
        //                     }, {})
        //                 })
        //                 success(formatedUsers)
        //             } else {
        //                 failed('No data found.')
        //             }
        //         }
        //     )
        // })
        const request = {
            // The ID of the spreadsheet to retrieve metadata from.
                spreadsheetId: spreadsheetId,  // TODO: Update placeholder value.
        
            // The ID of the developer metadata to retrieve.
                range: `A${metadataID}:B${metadataID+1}`,  // TODO: Update placeholder value.
        
            // auth: authClient,
            };

            try {
                const response = await sheetsClient.spreadsheets.values.get(request)
                console.log(response, '--response from get by id')
            } catch (e) {
                console.log(e, 'error from get by id')
            }

        console.log(response, 'getByid respnse')
    },

    updateByNumber: (spreadsheetId, metadataN, updateData) => {
        console.log(spreadsheetId, metadataN, updateData)
    }
}



// sheets().then(sheetsClient => {
//     console.log('sheet is connected')
//     connection = sheetsClient
// })

module.exports = sheetModel

