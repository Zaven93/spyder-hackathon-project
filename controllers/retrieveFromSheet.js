const ScrapeLinkedin = require('scrape-linkedin')
const authentication = require('../google/index')
const { google } = require('googleapis')

const scrapper = new ScrapeLinkedin()

const getFromSheet = (auth) => {
    return new Promise((success, failed) => {
        const sheets = google.sheets({ version: 'v4', auth })
        sheets.spreadsheets.values.get(
            {
                spreadsheetId: '10UjBhvKUfdOoeVSTVYHFI96Z2j7J50IyRMpxcpq9qm8',
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
}

const ifUpdateUser = (users) => {
    for (let i = 0; i < users.length; i++) {}
}

exports.retrieveUsers = (req, res) => {
    authentication
        .authenticated()
        .then((auth) => {
            getFromSheet(auth)
                .then((response) => {
                    console.log('Response Zaven jan', response)
                    res.set('Content-Type', 'text/html')
                    res.send(
                        response.map(
                            (user) => `<div>
                                        <h2>Name: ${user.Name}</h2>
                                        <h2>Surname: ${user.Surname}</h2>
                                        <h2>Email: ${user.Email}</h2>
                                        <h2>LinkedIn: ${user.LinkedIn}</h2>
                                        <h2>Link: ${user.Link}</h2>
                                        <h2>Alexa: ${user.Alexa}</h2>
                                        <h2>Muck Rack${user['Muck Rack']}</h2>
                                        <hr/>
                                        </div>`
                        )
                    )

                    return (
                        scrapper
                            .fetch('lisasabatini/')
                            // Handle the result
                            .then((profile) => console.log('Linked id data Zaven jan', profile))
                            // Handle an error
                            .catch((err) => console.log('Error Zaven', err))
                    )
                    // res.status(200).json({
                    //     message: response.map(
                    //         (user) => `<div>
                    //        <h1>${user.Name}</h1>
                    //     </div>`
                    //     )
                    // })
                })
                .catch((err) => {
                    res.status(404).json({
                        error: `i no gree fetch data from sheet, ${err}`
                    })
                })
        })
        .catch((err) => {
            res.status(401).json({
                error: `you know wetin happen, ${err}`
            })
        })
}
