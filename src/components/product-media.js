import { $Qll, $Q } from '../utils/query-selector'
import { createInterception } from '../utils/script-defer'
import { loadNavigation, loadPagination } from './slider-component'

/**
 * Product media init
 * @returns {VoidFunction}
 */
function productMedia () {
  const { matches } = window.matchMedia('(max-width: 768px)')

  if (matches) return bulletsMobile()

  return initProductMedia()
}

/**
 * Product media with swiper
 * @returns {VoidFunction}
 */
const initProductMedia = () => {
  const thumbs = $Q('#product-media-thumbs-js')
  const media = $Q('#product-media-js')

  if (!thumbs) return

  const thumbsParams = {
    slidesPerView: 4,
    spaceBetween: 12,
    direction: 'vertical'
  }

  Object.assign(thumbs, thumbsParams)
  thumbs.initialize()

  let mediaParams = {
    thumbs: {
      swiper: thumbs
    }
  }

  mediaParams = loadNavigation(media, mediaParams)
  mediaParams = loadPagination(media, mediaParams)

  Object.assign(media, mediaParams)
  return media.initialize()
}

/**
 * When image is visible
 * @param {HTMLElement} target - image on viewport
 * @param {Array} bullets - Collection of bullets point
 * @returns {VoidFunction}
 */
const imageVisible = (target, bullets) => {
  const { id } = target
  if (!id) return

  const bulletTarget = $Q(`.product-bullet-js[data-id='${id}']`)

  bullets.forEach((bullet) => bullet.classList.remove('visible'))
  return bulletTarget.classList.add('visible')
}

/**
 * Product media custom with interception observer
 */
const bulletsMobile = () => {
  const images = $Qll('.product-image-js')
  const bullets = $Qll('.product-bullet-js')

  images.forEach((image) => createInterception(
    image,
    () => imageVisible(image, bullets),
    { rootMargin: '0px', threshold: 0.5 }
  )
  )

  bullets.forEach((bullet) => {
    bullet.addEventListener('click', () => {
      const { dataset: { id } } = bullet
      if (!id) return

      const imageFocus = $Q(`[id='${id}']`)
      imageFocus.scrollIntoView(false)
    })
  })
}

export default productMedia
