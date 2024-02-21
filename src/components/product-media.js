import { addSwiperScript } from '../utils/add-script-tag'
import { $Qll, $Q } from '../utils/query-selector'
import { createInterception } from '../utils/script-defer'
import { loadNavigation } from './slider-component'

function productMedia () {
  const { matches } = window.matchMedia('(max-width: 768px)')

  if (matches) return bulletsMobile()

  return initProductMedia()
}

const initProductMedia = async () => {
  const thumbs = $Q('#product-media-thumbs-js')
  const media = $Q('#product-media-js')

  if (!thumbs) return
  await addSwiperScript()

  const thumbsParams = {
    slidesPerView: 4,
    spaceBetween: 15,
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

  Object.assign(media, mediaParams)
  return media.initialize()
}

const imageVisible = (target, bullets) => {
  const { id } = target
  if (!id) return

  const bulletTarget = $Q(`.product-bullet-js[data-id='${id}']`)

  bullets.forEach((bullet) => bullet.classList.remove('visible'))
  return bulletTarget.classList.add('visible')
}

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
