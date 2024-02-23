import { $Q } from 'graditify-utils'
import { isLastPage, loadContentItems } from './pagination.core'

let intersectionObserver

/**
 * Loads content into a web page from a list of elements and a container selector.
 * @param {Object} options - The options object.
 * @param {Array} options.listItems - The list of elements to load.
 * @param {string} options.container - The CSS selector of the container where the elements will be loaded.
 * @param {number} [options.oldScroll] - The scroll position before the content is loaded.
 */
const loadContent = ({ listItems, oldScroll, container }) => {
  const thisLastPage = isLastPage()

  // ! loading content
  listItems.forEach((item) => {
    $Q(container).appendChild(item)
    window.scroll(0, oldScroll)
  })

  // finish load content
  if (thisLastPage) {
    $Q('#loading-items').classList.add('hidden')
    $Q('.empty-items-js').classList.remove('hidden')
    intersectionObserver.disconnect()
  }
}

/**
 * Initial event interceptor
 */
export const infinityScroll = () => {
  const loadingClone = $Q('#loading').cloneNode(true)

  loadingClone.classList.remove('hidden')
  const loadItems = $Q('#loading-items')
  intersectionObserver = new IntersectionObserver(async (entries) => {
    if (entries[0].intersectionRatio <= 0) return
    // load more content;
    $Q('.empty-items-js').classList.add('hidden')
    loadItems.appendChild(loadingClone)
    loadItems.classList.remove('hidden')

    const response = await loadContentItems()

    loadContent(response)
  })

  // start observing
  intersectionObserver.observe($Q('.infinity-scroll-js'))

  // ! check if it is the last page on first load
  loadContent({ listItems: [] })
}
