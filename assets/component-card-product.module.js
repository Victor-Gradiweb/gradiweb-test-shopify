import { queryVariants, selectVariant } from './component-card-product-variant.submodule'
import { addProducts } from '../src/modules/cart'
import { $Q } from 'graditify-utils'

/**
 * web component for card product.
 * manage the variant change and add to cart events from here.
 * event delegation is used, this way we avoid having to reload the events once a reload is done by section rendering.
 */
class CardProduct extends HTMLElement {
  constructor () {
    super()
  }

  connectedCallback () {
    const form = $Q('form', this)

    this.addEventListener('change', (event) => {
      if (event.target.classList.contains('js-option')) {
        selectVariant(this)
        queryVariants(event)
      }
    })

    form.addEventListener('submit', (event) => {
      event.preventDefault()
      addProducts(event)
    })
  }
}

window.customElements.define('card-product', CardProduct)

export default CardProduct
