let counter = 1;

module.exports = async (browser, context) => {
  /* const env = {
    host: 'https://gradi-theme-base.myshopify.com',
    queryString: '?preview_theme_id=134439108788&_fd=0&pb=0',
    password: 'gradiweb',
    previewUrl: 'https://gradi-theme-base.myshopify.com?preview_theme_id=134439108788'
  } */

  console.log(context.url);

  // launch browser for LHCI 
  console.error('Getting a new page...');
  const page = await browser.newPage();
  
  // Get password cookie if password is set 
  if ('gradiweb' !== '' && counter === 1) {
    console.error('Getting password cookie...');
    await page.goto(context.url);
    await page.waitForSelector('form[action*=password] input[type="password"]');
    await page.$eval('form[action*=password] input[type="password"]', input => input.value = 'gradiweb');
    await Promise.all([
      page.waitForNavigation(),
      page.$eval('form[action*=password]', form => form.submit()),
    ])
  }
  
  // Get preview cookie
  console.error('Getting preview cookie...');
  await page.goto(context.url);
  // close session for next run
  await page.close();
  counter++
};