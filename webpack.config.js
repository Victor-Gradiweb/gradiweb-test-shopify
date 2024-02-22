const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const JS_DIR = path.resolve(__dirname, './src')
const JS_ASSET = path.resolve(__dirname, './assets')

const commonConfig = {
  entry: {
    theme: './src/templates/index.js',
    product: './src/templates/product.js',
    collection: './src/templates/collection.js',
    password: './src/templates/password.js',
    customer: './src/templates/customer.js',
    contact: './src/templates/contact.js',
    critical: './src/templates/critical.js',
    breadcrumbs: './assets/breadcrumbs.module.js',
    pagination: './assets/pagination.module.js',
    faq: './assets/faq-section.module.js',
    productcard: './assets/component-card-product.module.js',
    cart: './src/templates/cart.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [JS_DIR, JS_ASSET],
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}

module.exports = (_, ...args) => {
  const { mode } = args[0]
  const isDevelopment = mode === 'development'
  const fileName = (ext) => `[name]${isDevelopment ? '.dev' : ''}.${ext}`

  const config = {
    ...commonConfig,
    mode: isDevelopment ? 'development' : 'production',
    output: {
      filename: fileName('js'),
      path: path.resolve(__dirname, 'assets')
    },
    module: {
      rules: [
        ...commonConfig.module.rules,
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [new MiniCssExtractPlugin({
      filename: fileName('css')
    })]
  }

  return config
}
