import { concatRegexp, convertStringToFloat } from '../utils/quantity-price'
import { $Q } from '../utils/query-selector'

let count = 1
const countEl = document.getElementById('quantity')

const getPriceFormat = () => $Q('.regular')
const getPriceCompare = () => $Q('.compare ')
const priceInitial = () => convertStringToFloat($Q('.quantity-product-js').dataset.price)
const priceCompareInitial = () => convertStringToFloat($Q('.quantity-product-js').dataset.compare)

function changeCurrency (price) {
  return concatRegexp(getPriceFormat().textContent, price)
}

const updatePrice = (total, container) => {
  const totalPrice = changeCurrency(total.toFixed(2))
  container.innerHTML = totalPrice
}

function addCount () {
  count++
  countEl.value = count
  const totalCount = countEl.value
  const totalPrice = priceInitial() * totalCount
  updatePrice(totalPrice, getPriceFormat())

  if (getPriceCompare()) {
    const totalPriceCompare = priceCompareInitial() * totalCount
    updatePrice(totalPriceCompare, getPriceCompare())
  }
}

function minusCount () {
  if (count > 1) {
    count--
    countEl.value = count
    const totalCount = countEl.value
    const totalPrice = priceInitial() * totalCount
    updatePrice(totalPrice, getPriceFormat())
    if (getPriceCompare()) {
      const totalPriceCompare = priceCompareInitial() * totalCount
      updatePrice(totalPriceCompare, getPriceCompare())
    }
  }
}

export const initProductQuantity = () => {
  $Q('.num-minus').addEventListener('click', minusCount)
  $Q('.num-add').addEventListener('click', addCount)
}
