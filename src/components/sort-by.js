import { $Q } from '../utils/query-selector'
const Shopify = window.Shopify

Shopify.queryParams = {}

/**
 * Update sort_by query parameter on select change
 */
export const defaultSortBy = () => {
  $Q('#sort-by-js')
    .addEventListener(
      'change',
      ({ target }) => {
        Shopify.queryParams.sort_by = target.value
        location.search = new URLSearchParams(Shopify.queryParams).toString()
      })
}

/**
 * Preserve existing query parameters
 */
// eslint-disable-next-line func-names
(function () {
  if (location.search.length) {
    const params = location.search.substring(1).split('&')

    for (let i = 0; i < params.length; i++) {
      const keyValue = params[i].split('=')

      if (keyValue.length) {
        Shopify.queryParams[
          decodeURIComponent(keyValue[0])
        ] = decodeURIComponent(keyValue[1])
      }
    }
  }
}())
