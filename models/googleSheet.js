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

    getById: async (spreadsheetId, metadataId, data) => {
        const sheetsClient = await sheets()
        const resource = {
            values: [[
                data.Name, 
                data.Surname, 
                data.Email, 
                data.LinkedIn, 
                data['Muck Rack'], 
                data.Link, 
                data.Alexa, 
                data.JobTitle, 
                data.Topic], []],
            
          };
        return new Promise((success, failed) => {
            sheetsClient.spreadsheets.values.update(
                {
                    fields: sheetsClient.properties,
                    spreadsheetId: spreadsheetId,
                    range: `B${metadataId}:J${metadataId}`,
                    valueInputOption: 'raw',
                    resource,
                },
                (err, res) => {
                    if (err) {
                        return failed(err)
                    }
                    success('ok')
                }
            )
        })
    }
}

module.exports = sheetModel

