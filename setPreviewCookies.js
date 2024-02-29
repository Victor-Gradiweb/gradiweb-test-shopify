module.exports = async (browser) => {
  const env = {
    host: 'https://gradi-theme-base.myshopify.com',
    queryString: '?preview_theme_id=134439108788&_fd=0&pb=0',
    password: 'gradiweb',
    previewUrl: 'https://gradi-theme-base.myshopify.com?preview_theme_id=134439108788'
  }
  
  // launch browser for LHCI
  console.error('Getting a new page...');
  const page = await browser.newPage();
  // Get password cookie if password is set
   
  if (env.password !== '') {
    console.error('Getting password cookie...');
    await page.goto(`${env.host}/password${env.queryString}`);
    await page.waitForSelector('form[action*=password] input[type="password"]');
    await page.$eval('form[action*=password] input[type="password"]', input => input.value = env.password);
    await Promise.all([
      page.waitForNavigation(),
      page.$eval('form[action*=password]', form => form.submit()),
    ])
  }
  
  // Get preview cookie
  console.error('Getting preview cookie...');
  await page.goto(env.previewUrl);
  // close session for next run
  await page.close();
};