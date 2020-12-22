const puppeteer = require('puppeteer')

const scrap = async () => {
    const browser = await puppeteer.launch({
        headless: true
    })
    const page = await browser.newPage()

    await page.goto('https://muckrack.com/caitlin-mccormack')

    const newPageUrl = await page.$eval('a.mr-contact', (elm) => elm.href)

    if (!newPageUrl) {
        return
    } else {
        await page.goto(newPageUrl)

        const emailInfo = await page.$eval('div.wpcw-widget-contact a', (elm) => elm.textContent)

        console.log('Email info', emailInfo)
    }
}

scrap()
