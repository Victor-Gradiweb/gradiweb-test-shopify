import { $Q } from './query-selector'

/**
A function that adds a script tag to the document body.
@param {string} script - The source URL of the script.
@returns {void}
*/
export const addTagScript = (script, reference) => {
  if (!script || !reference) return

  const scriptTag = $Q(`#${reference}`)
  if (scriptTag || window[`${reference}`]) {
    return new Promise((resolve) => {
      resolve(true)
    })
  }

  return new Promise((resolve, reject) => {
    const scriptTag = document.createElement('script')
    scriptTag.src = script
    scriptTag.setAttribute('id', reference)

    scriptTag.onload = () => {
      window[`${reference}`] = true
      resolve(true)
    }

    scriptTag.onerror = () => {
      reject(new Error(`Failed to load script ${scriptTag.src}`))
    }

    const theme = $Q('#MainContent')
    theme.insertAdjacentElement('beforebegin', scriptTag)
  })
}

export const addSwiperScript = async (callback) => {
  const scriptNode = $Q('#swiper-script-js')
  if (!scriptNode) return

  const { dataset: { script } } = scriptNode
  const loadScript = await addTagScript(script, 'swiperScript')

  if (loadScript && callback) {
    callback()
  }

  return loadScript
}
