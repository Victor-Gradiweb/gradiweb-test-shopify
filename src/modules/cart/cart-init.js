import { barProgress } from './cart-bar-progress'
import { $Q } from '../../utils/query-selector'
import { createInterception } from '../../utils/script-defer'
import { btnAddToCart, openCloseCart } from './cart'
import { loadSliderByEvent } from '../../components/slider-component'
import ItemCart from './cart-item'

/**
 * Cart initialization:
 * We work with interceptor to validate cart on viewport
 */
const initCart = () => {
  openCloseCart()

  const formAddFormUpsell = $Q('.add-product-cart-upsell')
  const cart = $Q('#cart-items')

  if (formAddFormUpsell) createInterception(formAddFormUpsell, () => btnAddToCart('.add-product-cart-upsell'))
  if (cart) createInterception(cart, () => loadCartEvents())
}

/**
 * load cart events:
 * - Item cart
 * - Progress bar
 * - Upsell
 */
const loadCartEvents = () => {
  if ($Q('.slider-js.swiperElsidecart')) loadSliderByEvent($Q('.slider-js.swiperElsidecart'))
  window.customElements.define('item-cart', ItemCart)
  barProgress($Q('#progress-bar-data'))
}

export { initCart }
