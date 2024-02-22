import { $Q } from 'graditify-utils'
import { isLastPage, loadContentItems } from './pagination.core'

/**
 * Loads content into a web page from a list of elements and a container selector.
 *
 * @param {Object} data - The object containing information about the elements to load.
 * @param {Array} data.listItems - The list of elements to load.
 * @param {string} data.container - The CSS selector of the container where the elements will be loaded.
 */
const loadContent = ({ listItems, container }) => {
  const thisLastPage = isLastPage()

  // ! loading content
  listItems.forEach((item) => {
    $Q(container).appendChild(item)
  })

  if (thisLastPage) {
    $Q('.btn-load-js').classList.add('hidden')
    $Q('.empty-items-js').classList.remove('hidden')
  }
}

/**
 * Initial event interceptor
 */
export const buttonLoadMore = () => {
  // ! check if it is the last page on first load
  loadContent({ listItems: [] })

  const button = $Q('.btn-load-js')
  const contentButton = button.textContent

  if (!button) return

  const loadingClone = $Q('#loading').cloneNode(true)
  loadingClone.classList.remove('hidden')
  button.addEventListener('click', async () => {
    button.textContent = ''
    button.appendChild(loadingClone)

    const response = await loadContentItems()

    button.textContent = contentButton
    loadContent(response)
  })
}
