import { stringToHTML, $Q } from 'graditify-utils'
import { shopifyVariantByUrl } from 'graditify-api'
/**
 * Captures the HTML section of the product in question and returns data
 *
 * @param {String} handle Data element of the product
 * to which the query will be made
 * @param {String} variantId Id of the selected variant
 * @returns Object - price, available, button
 */
export async function sectionHandle (handle, variantId) {
  const htmlResponse = await shopifyVariantByUrl(`/products/${handle}`, variantId)
  const variantPrice = $Q('.price-product-js', stringToHTML(htmlResponse))
  const variantAvailable = $Q('[name="available"]', stringToHTML(htmlResponse))
  const button = $Q('.btn-cart-js', stringToHTML(htmlResponse))

  return {
    price: variantPrice.outerHTML,
    available: variantAvailable.value,
    button: button.textContent
  }
}

/**
 * Inject new price node to the section
 *
 * @param {HTMLCollection} variantPrice - Object with the price value
 * @param {HTMLElement} parent - Parent node to closest
 * with className 'product-js'
 *
 */
export function updatePrice (variantPrice, parent) {
  const sectionPrice = $Q('.price-product-js', parent)

  sectionPrice.innerHTML = variantPrice
}

/**
 * Show not available of the variant, depending of the stock
 *
 * @param {String} available - Dataset available
 * @param {HTMLElement} parent - Parent node to closest
 * with className 'product-js'
 * @param {String} newText - New text in button add to cart
 */
export function updateButton (available, parent, newText) {
  const button = $Q('.btn-cart-js', parent)
  button.innerHTML = newText

  if (available === 'false') {
    button.disabled = true
  } else {
    button.disabled = false
  }
}
