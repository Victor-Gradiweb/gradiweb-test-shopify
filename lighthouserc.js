const env = {
  host: 'https://gradi-theme-base.myshopify.com',
  queryString: '?preview_theme_id=134439108788&_fd=0&pb=0',
  password: 'gradiweb',
  previewUrl: 'https://gradi-theme-base.myshopify.com?preview_theme_id=134439108788',
  collectionUrl: '/collections/all',
  productUrl: '/products/ricoh-theta-sc2'
}

module.exports = {
  ci: {
    collect: {
      url: [
        `${env.previewUrl}`,
        `${env.host}${env.collectionUrl}${env.queryString}`,
        `${env.host}${env.productUrl}${env.queryString}`
      ],
      puppeteerScript: './setPreviewCookies.js',
      chromePath: '/usr/bin/google-chrome-stable',
      puppeteerLaunchOptions: {
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu"
        ]
      }
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        "categories:performance": ["error", {"minScore": 0.6}],
        "categories:accessibility": ["warn", {"minScore": 0.8}]
      }
    }
  },
};