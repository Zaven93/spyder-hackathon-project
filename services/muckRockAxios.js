const axios = require('axios')
const DomParser = require('dom-parser')

const parser = new DomParser()

const getMuckRackData = async (muckRuckUrl) => {
    const muckRackData = {}
    const response = await axios.get(muckRuckUrl)
    const muckRackDOM = parser.parseFromString(response.data)

    const emailHref = muckRackDOM.getElementsByClassName('mr-contact break-word top-xs js-icon-envelope')
    const contactDivs = muckRackDOM.getElementsByClassName("profile-section-social")
    const titlesDivs = muckRackDOM.getElementsByClassName("person-details-item person-details-title")
    const topicDivs = muckRackDOM.getElementsByClassName("person-details-item person-details-beats")
    let contactAs = []

    if(titlesDivs.length > 0) {
        const jobTitleAs= titlesDivs[0].getElementsByTagName('a')
        if (jobTitleAs[0]) muckRackData.jobTitle = jobTitleAs[0].innerHTML
    }
    if(topicDivs.length > 0) {
        const topicTitleAs= topicDivs[0].getElementsByTagName('a')
        if (topicTitleAs[0]) muckRackData.topic = topicTitleAs[0].innerHTML
    }
    
    if(emailHref.length > 0) {
        try {
            const emailPageDOM = parser.parseFromString(emailPageResponse.data)
            if (emailPageDOM) {
                const linkContainer = emailPageDOM.getElementsByClassName('padd')
                if (linkContainer[0]) {
                    const emailA = linkContainer[0].getElementsByTagName('a')
                    if(emailA[0]) {
                        const email = emailA[0].innerHTML
                        muckRackData.email = email 
                    }
                }
            }
        } catch (e) {
            
        }
    }
    contactDivs.forEach(div => [
        contactAs = contactAs.concat(div.getElementsByTagName('a'))
    ])

    contactAs.forEach(a => {
        if (a.getAttribute('title') === 'Twitter') muckRackData.twitter = a.getAttribute('href')
        if (a.getAttribute('title') === 'LinkedIn') muckRackData.linkedin = a.getAttribute('href')
    })

    return muckRackData
}

module.exports = getMuckRackData