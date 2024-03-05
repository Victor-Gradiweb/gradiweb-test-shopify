import 'swiper/css'
import '../scss/product.scss'
import '../components/upsell-api'

import { initProductQuantity } from '../components/product-quantity'
import { variantOnChange } from '../components/variants-product'
import { submitForm } from '../modules/cart'
import { createInterception } from '../utils/script-defer'
import { $Q } from '../utils/query-selector'

window.addEventListener('load', () => {
  const scope = $Q('.main-product')
  const variants = $Q('.variants')
  const form = $Q('.add-product-cart', scope)

  initProductQuantity()

  submitForm(form)
  if (variants) createInterception(variants, () => variantOnChange('.variants', scope))
})
