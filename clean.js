const fs = require('fs')

const directoryPath = './assets/'
const excludeFiles = []
const pattern = /\.dev.js$|\.dev.css$/i

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log(`Error reading directory: ${err}`)
    return
  }

  const cssFiles = files.filter((file) => {
    if (pattern.test(file) && !excludeFiles.includes(file)) {
      return file
    }

    return null
  })

  console.log(`CSS files found: ${cssFiles}`)

  // Delete files
  cssFiles.forEach((file) => {
    const filePath = `${directoryPath}/${file}`
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(`Error deleting file ${filePath}: ${err}`)
        return
      }

      console.log(`File ${filePath} deleted successfully`)
    })
  })
})
