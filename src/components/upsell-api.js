import api from '../services/api'
import { $Q } from '../utils/query-selector'
import { stringToHTML } from '../utils/to-html'

/**
 * Render recommendation by API with product ID
 * @return void
 */
async function getRecommendation () {
  const {
    dataset: {
      product
    }
  } = $Q('#product-recommendations')

  const html = await api.recommendationByApi(product, 'product-recommendation')
  const recommendation = $Q('#product-recommendations', stringToHTML(html))

  if (recommendation && recommendation.innerHTML.trim().length) {
    $Q('.shopify-section.recommendation').innerHTML = recommendation.outerHTML
  }
}

/**
 * Create intersection observer from product page and
 * observe recommendation section
 * @return void
 */
(function () {
  const section = $Q('#product-recommendations')

  const handle = (entries, observer) => {
    if (!entries[0].isIntersecting) return
    observer.unobserve(section)
    getRecommendation()
  }

  const observer = new IntersectionObserver(
    handle, {
      rootMargin: '0px 0px 200px 0px'
    }
  )

  if (section) observer.observe(section)
}())
