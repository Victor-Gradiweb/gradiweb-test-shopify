const process = require('process')
const env = {
  host: process.env.HOST || 'https://gradi-theme-base.myshopify.com',
  queryString: `?preview_theme_id=${process.env.THEME_ID_PREVIEW || '134439108788'}&_fd=0&pb=0`,
  previewUrl: `${process.env.HOST}?preview_theme_id=${process.env.THEME_ID_PREVIEW || '134439108788'}&_fd=0&pb=0`,
  collectionUrl: `/collections/${process.env.COLLECTION_URL}` || '/collections/all',
  productUrl: `/products/${process.env.PRODUCT_URL}` || '/products/ricoh-theta-sc2'
}

module.exports = {
  ci: {
    collect: {
      url: [
        `${env.previewUrl}`,
        `${env.host}${env.collectionUrl}${env.queryString}`,
        `${env.host}${env.productUrl}${env.queryString}`
      ],
      numberOfRuns: 2,
      chromePath: '/opt/hostedtoolcache/chromium/latest/x64/chrome',
      puppeteerScript: './setPreviewCookies.js',
      puppeteerLaunchOptions: {
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu'
        ]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.7 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }]
      }
    }
  }
}
