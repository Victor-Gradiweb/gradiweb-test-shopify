const fs = require('fs')
const path = require('path')
const process = require('process')
const mode = process.argv[2]
const liquidTag = /{% render 'compilation-tag'/g

const liquidFilePath = path.resolve(__dirname, 'layout/theme.liquid')

const replaceRenderLiquidTag = async () => {
  const isDevelopment = mode === 'development'
  const htmlContent = await fs.promises.readFile(liquidFilePath, 'utf-8')
  let modifiedHtmlContent = ''

  if (!htmlContent.match(liquidTag)) return

  if (isDevelopment) {
    modifiedHtmlContent = htmlContent.replace(
      /{% render 'compilation-tag', development: (false|true)?/g, 
      `{% render 'compilation-tag', development: true`
    )
  } else {
    modifiedHtmlContent = htmlContent.replace(
      /{% render 'compilation-tag', development: (false|true)?/g, 
      `{% render 'compilation-tag', development: false`
    )
  }

  fs.writeFile(liquidFilePath, modifiedHtmlContent, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`Successfully updated ${liquidFilePath} with and COMPILE TO PROD`)
    }
  })
}

replaceRenderLiquidTag()
