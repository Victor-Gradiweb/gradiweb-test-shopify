import api from '../../services/api'
import { $Q, $Qll } from '../../utils/query-selector'
import { dataToggle, toggleDataActive } from '../../utils/toggle-dataset'
import { addSpinner, cartAlert, debounce } from './cart-utils'
import {
  updateCartItems,
  updatetotalPrice,
  updateUpsell,
  updateCartbutton,
  updatePriceItem,
  updateQuantity
} from './update-cart'

const CART_SECTION = 'side-cart,cart-page'

/**
 * Add products in cart
 * @param {event} event -Event submit from add to cart form
 * @param {event} event -Event submit from add to cart form
 */
export const addProducts = async (event) => {
  const buttonContent = $Q('.btn-cart-js', event.target)
  const textButton = buttonContent.textContent
  const valueCount = $Q('#quantity') ? $Q('#quantity').value : 1
  const itemId = $Q("input[name='id']", event.target).value

  addSpinner('.btn-cart-js', event.target)
  const cartParams = {
    items: [
      {
        id: itemId,
        quantity: valueCount
      }
    ],
    sections: CART_SECTION
  }

  const { sections, ...response } = await api.addToCart(cartParams)

  if (response.status === 422) {
    cartAlert(response)
    buttonContent.textContent = textButton
    return
  }

  if (!sections) return null

  buttonContent.textContent = textButton

  if (event.target.dataset.form !== 'upsell') {
    dataToggle($Q('#shopify-section-side-cart'), true)
  }

  updateCartItems(sections['side-cart'])
  updateCartbutton(sections['side-cart'])
  updatetotalPrice(sections['side-cart'])
  updateUpsell(sections['side-cart'])
}

/**
 * Event listener on submit form
 * and prevent default behavior
 * @param {ElementHTML} form - Element node to add product. Its HTML form
 */
export const submitForm = (form) => {
  if (!form) return

  form.addEventListener(
    'submit',
    (e) => {
      e.preventDefault()
      addProducts(e)
    }
  )
}

/**
 * Listen if add to cart form is submited
 * if add to cart form is submited add products in cart
 *
 * if you want to add the event to a single repeated element,
 * you can use only the form selector for example.
 * but if you have several events on the same page
 * that load at different times, you can pass the parent of
 * the element so that it only loads that event and
 * not the ones that are loaded.
 * @param {string} formQuery - className reference in form add-to-cart
 *
 * To active this feature - ADD className 'add-cart-js' in form product
 * */
export const btnAddToCart = (formQuery, scope = null) => {
  const addForms = $Qll(formQuery, scope)

  if (addForms != null) {
    addForms.forEach(
      (form) => {
        submitForm(form)
      }
    )
  }
}

/**
 * Update quantity for each item in cart
 * @param {number} id Product ID
 * @param {number} quantity new quantity
 */
export const updateCart = async (line, quantity, id) => {
  const priceNode = $Q(`#price-${id}`)
  const priceBefore = priceNode.textContent
  const quantityBefore = $Q(`.item-cart-js[data-index="${line}"]`).dataset.quantity

  const cartParams = {
    line,
    quantity,
    sections: CART_SECTION
  }

  addSpinner(`#price-${id}`)
  const { sections, ...response } = await api.changeCart(cartParams)

  if (response.status === 422) {
    priceNode.textContent = priceBefore
    updateQuantity(id, quantityBefore)
    cartAlert(response)

    return false
  }

  if (!sections) return false

  if (Number(quantity) === 0) {
    updateCartItems(sections['side-cart'])
    updateCartbutton(sections['side-cart'])
    updatetotalPrice(sections['side-cart'])
    updateUpsell(sections['side-cart'])
  } else {
    updatePriceItem(sections['side-cart'], id)
    updateCartbutton(sections['side-cart'])
    updatetotalPrice(sections['side-cart'])
  }

  return true
}

/**
 * Event onChange in the cart item
 */
export const changeItem = (scope = null) => {
  const input = $Q('.item-cart-js', scope)

  input.addEventListener(
    'change',
    debounce(async () => {
      const udpate = await updateCart(
        input.dataset.index, input.value, input.id
      )

      if (udpate) {
        input.setAttribute('data-quantity', input.value)
      }
    }, 500).bind(this)
  )
}

/**
 * Delete item in cart
 * listen if delete button is clicked
 * if is clicked, update cart with quantity 0
 */
export const deleteItem = (scope = null) => {
  const element = $Q('.item-delete', scope)
  if (!element) return

  const { dataset: { id, index } } = element
  element.addEventListener(
    'click',
    () => updateCart(index, 0, `${id}-${index}`)
  )
}

/**
* Open and close side cart with various buttons
*/
export const openCloseCart = () => {
  const cartContainer = $Q('.side-cart')
  const btnCart = $Q('.button-cart-js')
  if (!cartContainer || !btnCart) return

  cartContainer.setAttribute('data-active', 'false')

  toggleDataActive(
    '.button-cart-js',
    '.side-cart',
    {
      overlay: true,
      closeSelector: '.cart-close-js'
    }
  )
}
