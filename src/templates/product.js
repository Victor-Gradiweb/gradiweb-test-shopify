import 'swiper/css'
import '../scss/product.scss'
import '../components/upsell-api'
import productMedia from '../components/product-media'
import { initProductQuantity } from '../components/product-quantity'
import { variantOnChange } from '../components/variants-product'
import { submitForm } from '../modules/cart'
import { createInterception } from '../utils/script-defer'
import { $Q } from '../utils/query-selector'

window.addEventListener('load', () => {
  const scope = $Q('.main-product')
  const variants = $Q('.variants')
  const form = $Q('.add-product-cart', scope)

  productMedia()
  initProductQuantity()

  submitForm(form)
  if (variants) createInterception(variants, () => variantOnChange('.variants', scope))
})
