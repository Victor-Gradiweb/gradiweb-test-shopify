import { $Q, $Qll } from '../utils/query-selector'

/**
 *
 * we control the price range filter in order to avoid that the minimum
 * value is greater than the highest value and that the highest
 * value is not less than the lowest value
 *
 */
export function rangeFilters () {
  const rangeIn = $Qll('.range-in input')
  const priceIn = $Qll('.price-in input')
  const progress = $Q('.slider-filter .pro')
  const priceGap = 0

  rangeIn.forEach((input) => {
    if (priceIn[0].value) {
      progress.style.left = `${(priceIn[0].value / rangeIn[0].max) * 10000}%`
      progress.style.right = `${100 - (priceIn[1].value / rangeIn[1].max) * 10000}%`
    }

    input.addEventListener('input', (e) => {
      const minVal = Number(rangeIn[0].value)
      const maxVal = Number(rangeIn[1].value)

      if (maxVal - minVal < priceGap) {
        if (e.target.className === 'range-min') {
          rangeIn[0].value = cents(maxVal - priceGap)
        } else {
          rangeIn[1].value = cents(minVal + priceGap)
        }
      } else {
        priceIn[0].value = cents(minVal, true)
        $Q('.range1 div').textContent = cents(minVal, true)
        priceIn[1].value = cents(maxVal, true)
        $Q('.range2 div').textContent = cents(maxVal, true)
        progress.style.left = `${(minVal / rangeIn[0].max) * 100}%`
        progress.style.right = `${100 - (maxVal / rangeIn[1].max) * 100}%`
      }
    })
  })
}

function cents (str, fixed) {
  const number = Number(str) / 100
  if (fixed) return number.toFixed(2)
  return number
}

(function formatValues () {
  $Qll('.price-in input').forEach(
    (item) => {
      item.value = cents(item.value, true)
    }
  )
}())
