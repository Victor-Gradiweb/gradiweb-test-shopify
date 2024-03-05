/**
 * This function detects, by means of the observer,
 * the interception with the slider,
 * to load it, and then disconnects the observer for the corresponding element.
 * @param {Node} entries - element node html, container slider
 * @param {Event} observer - observer event
 * @param {Function} callback - function callback start slider
 */
const executeInterception = (
  entries,
  observer,
  params
) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    params.callback()

    if (params.unobserve) {
      observer.unobserve(entry.target)
    }
  }
})

/**
 * Creates the interceptor for the node
 * indicated in the parameter indicated as slide
 * @param {Node} element - element container slider
 * @param {Function} callback - callback init slider
 */
export const createInterception = (
  element,
  callback,
  options = { root: null, rootMargin: '120px', unobserve: true }
) => {
  const optionsRoot = options
  const unobserve = options.unobserve || false

  delete optionsRoot.unobserve

  const intersectionObserver = new
  IntersectionObserver(
    (entries, observer) => executeInterception(
      entries, observer, { callback, unobserve }), optionsRoot)

  intersectionObserver.observe(element)
}
