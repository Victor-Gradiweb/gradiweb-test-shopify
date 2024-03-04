const process = require('process')
const password = process.env.SHOP_PASSWORD || 'gradiweb'
let counter = 1

module.exports = async (browser, context) => {
  // launch browser for LHCI
  console.error('Getting a new page...')
  const page = await browser.newPage()

  // Get password cookie if password is set
  if (password !== '' && counter === 1) {
    console.error('Getting password page cookie...')
    await page.goto(context.url)
    await page.waitForSelector('form[action*=password] input[type="password"]')
    await page.$eval('form[action*=password] input[type="password"]', (input) => { input.value = password })
    await Promise.all([
      page.waitForNavigation(),
      page.$eval('form[action*=password]', form => form.submit())
    ])
  }

  // Get preview cookie
  console.error('Getting preview page cookie...')
  await page.goto(context.url)
  // close session for next run
  await page.close()
  counter++
}
