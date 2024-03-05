import { $Q, $Qll } from '../utils/query-selector'
import { dataToggle, toggleDataActive } from '../utils/toggle-dataset'

/**
 * Reset re-render DOM
 * @param {HTMLElement} modal - node content video frame
 */
export function resetVideo (modal) {
  console.log('reset')
  const wrapper = modal
  wrapper.innerHTML = $Q('.video__modal-wrapper', modal).outerHTML
}

/**
 * Init video section by id
 */
export const initVideoFrame = () => {
  $Qll('.video__button').forEach((button) => {
    const { dataset: { section } } = button

    toggleDataActive(
      `#play-button-${section}-js`,
      `#modal-video-${section}-js`,
      {
        overlay: true,
        closeSelector: '.video__close'
      }
    )
  })

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
      const modal = $Q('.video__modal')
      if (modal.dataset.active === 'true') {
        dataToggle(modal, true)
      }
    }
  })
}
