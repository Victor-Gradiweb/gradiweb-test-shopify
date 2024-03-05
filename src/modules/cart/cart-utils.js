import { $Q } from '../../utils/query-selector'
let wait = false

/**
 * Replace en element with a spinner
 * @param {String} element
 */
const addSpinner = (element, parent) => {
  $Q(element, parent).innerHTML = '<div class="loading"></div>'
}

/**
 * Display alert of cart API
 * @param {String} response - Dynamic response API
 */
const cartAlert = (request = null) => {
  if (wait) return

  wait = true
  const message = $Q('#error-out-stock')
  const info = $Q('span', message)

  if (request && request.data) {
    info.textContent = request.data.description || request.data.message
  } else {
    info.textContent = message.dataset.message
  }

  message.classList.remove('hidden')

  setTimeout(() => {
    message.classList.add('hidden')
    wait = false
  }, 5000)
}

/**
 * Delay function
 *
 * @param {Function} fn - Function that you want a delay execution
 * @param {Number} wait - This time delay (ms)
 * @returns Function delay
 */
function debounce (fn, wait) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn.apply(this, args), wait)
  }
}

export { addSpinner, cartAlert, debounce }
