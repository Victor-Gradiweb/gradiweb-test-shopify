/* eslint-disable max-len */
import { $Q, $Qll } from 'graditify-utils'

const menu = $Q('.categories-menu')
const menuItems = $Qll('.categories-menu__item')

/**
 * Initializes the category menu event listener
 * for showing or hiding the blocks on click
 * If the screen size is less than 767px
 * the scrollTop function will be executed
 */
export const initEventCategory = () => {
  if (!menu) return
  window.addEventListener('load', showMoreFAQ())

  menuItems.forEach((item) => {
    item.addEventListener('click', () => {
      const sectionContainer = item.parentNode.parentNode
      cleanCategories(sectionContainer)
      categoryClicked(item)
      if (window.innerWidth < 767) {
        scrollTop(sectionContainer.offsetTop)
      }
    })
  })
}

/**
 * Scrolls to a specific position on the page.
 * @param {number} toplock - The Y coordinate of the target element to scroll to.
 */
const scrollTop = (toplock) => {
  window.scrollTo({ top: toplock, behavior: 'smooth' })
}

/**
 * Removes 'clicked-js' class from each '.categories-menu__item' element within the given section container,
 * and hides each '.categories-container' element.
 *
 * @param {HTMLElement} sectionContainer - The section container element that contains the categories to clean.
 */
const cleanCategories = (sectionContainer) => {
  const items = $Qll('.categories-menu__item', sectionContainer)
  items.forEach((item) => {
    item.classList.remove('clicked-js')
  })

  const content = $Qll('.categories-container', sectionContainer)
  content.forEach((block) => {
    block.classList.remove('show')
    block.classList.add('hide')
  })
}

/**
 * Adds the 'clicked-js' class to the clicked menu item
 * @param {HTMLElement} item The clicked menu item element
 */
const categoryClicked = (item) => {
  const dataHandle = item.dataset.handle
  item.classList.add('clicked-js')
  showContentClicked(dataHandle)
}

/**
 * Shows the content of the clicked menu item
 * @param {string} data The data handle of the clicked menu item
 */
const showContentClicked = (data) => {
  const itemShowed = document.querySelector(`.categories-container[data-handle="${data}"]`)
  itemShowed.classList.remove('hide')
  itemShowed.classList.add('show')
  showMoreFAQ()
}

/**
 * Shows a "read more" link for long FAQ answers
 * and toggles the display of the full answer.
 * @returns {void}
 */
const showMoreFAQ = () => {
  const readMoreText = 'VOIR PLUS'
  const readLessText = 'VOIR MOINS'
  const contentItems = document.querySelectorAll('.block-container__content')

  contentItems.forEach((item) => {
    const content = item.querySelector('.block-container__description').innerHTML
    if (!content.includes('<p>...</p>')) {
      return
    }
    const [content1, content2] = splitContent(content)
    updateContent(item, content1, content2, readMoreText)

    const dots = item.querySelectorAll('.dots')
    dots.forEach((dot) => {
      // eslint-disable-next-line no-param-reassign
      dot.onclick = () => {
        handleDotsClick(dot, readLessText, readMoreText)
      }
    })
  })
}

/**
Splits the content of an FAQ answer if it contains a "read more" link.
@param {string} content - The HTML content of an FAQ answer.
@returns {string[]} An array with two strings:
the first part of the content and
the second part that will be hidden by the "read more" link (if it exists).
*/
const splitContent = (content) => {
  const [content1, content2] = content.split('<p>...</p>')
  return [content1, content2]
}

/**
Updates the HTML of an FAQ answer to include the "read more" link.
@param {HTMLElement} item - The FAQ item container element.
@param {string} content1 - The first part of the answer content.
@param {string} content2 - The second part of the answer content that will be hidden by the "read more" link.
@param {string} readMoreText - The text to display in the "read more" link.
@returns {void}
*/
const updateContent = (item, content1, content2, readMoreText) => {
  const description = item.querySelector('.block-container__description')
  description.innerHTML = `
    ${content1}
    <span class="show">${content2}</span>
    <span class="dots">${readMoreText}</span>
  `
}

/**
Toggles the display of the full FAQ answer when the "read more" link is clicked.
@param {HTMLElement} dot - The "read more" link element.
@param {string} readLessText - The text to display in the "read less" link.
@returns {void}
*/
const handleDotsClick = (dot, readLessText, readMoreText) => {
  const parentContent = dot.closest('.block-container__description')
  const more = parentContent.querySelector('.show')
  const less = parentContent.querySelector('.dots')
  more.classList.toggle('show-less')
  less.innerText = more.classList.contains('show-less') ? readLessText : readMoreText
}
