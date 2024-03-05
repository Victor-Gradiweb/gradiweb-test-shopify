import { $Q, $Qll } from 'graditify-utils'
import { sectionHandle, updateButton, updatePrice } from './component-card-product-update.submodule'

/**
 * @param {HTMLElement} parent - Dom element parent of all selectors options
 * @returns Array of nodes
 */
const options = (parent) => $Qll('.js-option', parent)

/**
  * @param {Array} options - Array of option names
  * @returns separate options with "/"
  */
const buildOption = (options) => options.join(' / ')

/**
 * optionChecked
 * Iterates and searches for the options that were selected
 *
 * @param {HTMLElement} parent - Dom element parent of all selectors options
 * @returns A variant name - string reference
 */
function optionsChecked (parent) {
  let myOptions = []

  options(parent).forEach(
    (option) => {
      if (option.type === 'radio') {
        if (option.checked === true) {
          myOptions = [...myOptions, option.value]
        }
      } else {
        myOptions = [...myOptions, option.value]
      }
    }
  )
  return buildOption(myOptions)
}

/**
 * selectVariant
 * Searches for a selected variant in an object stored in
 * the DOM (input[id="variants"])
 *
 * @param {HTMLElement} parent - Dom element parent of all selectors options
 * @returns Replacement of id in the dom (on input[name="id"])
 */
export function selectVariant (parent) {
  const variantName = optionsChecked(parent)
  const variants = JSON.parse($Q('#variants', parent).value)

  const variantFilter = variants.filter(
    (variant) => variant.title === variantName
  )

  $Q('[name="id"]', parent).value = variantFilter[0].id
}

/**
 * Section rendering to dynamic price and available data
 *
 * @param {HTMLElement} param0 - Node with event change
 *
 * @author Andres Briñez
 * @author Cristian Velasco
 * @version 2.0
 */
export async function queryVariants ({ target }) {
  const addCartBtn = $Q('.btn-cart-js', target.closest('.product-js'))
  const {
    value,
    dataset
  } = $Q('[name="id"]', target.closest('.product-js'))

  addCartBtn.disabled = true
  addCartBtn.innerHTML = '<div class="loading"></div>'

  const {
    price,
    available,
    button
  } = await sectionHandle(dataset.variant, value)

  updatePrice(price, target.closest('.product-js'))
  updateButton(available, target.closest('.product-js'), button)
}
