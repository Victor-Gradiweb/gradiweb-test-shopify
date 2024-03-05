import { $Q, $Qll } from '../utils/query-selector'
import { toggleDataActive } from '../utils/toggle-dataset'

/**
 * Init resource windows
 * @param {{ control: string, target: string }} params - Init parametres
 * @param {String} params.control - Reference controller the open modal window
 * @param {String} params.target - Reference of the modal window
 */
const initWindows = ({ control, target }) => {
  windowsToggle(target)

  toggleDataActive(
    control,
    target,
    {
      overlay: true,
      closeSelector: '.window-close-js'
    }
  )
}

/**
 * Action on click item window
 *
 * @param {HTMLElement} scope - scope or parent target
 */
const windowsToggle = (scope) => {
  const parentNode = $Q(scope)
  const itemToggle = $Qll('.window-item-js', parentNode)
  const layerItems = $Qll('.window-layer-close-js', parentNode)

  itemToggle.forEach((item) => item.addEventListener('click',
    () => {
      item.setAttribute('data-active', 'true')
    }
  ))

  layerItems.forEach((layeritem) => {
    layeritem.addEventListener('click', () => {
      const layer = layeritem.closest('.window-layer-js')
      if (!layer) return null
      const sibling = layer.previousElementSibling
      sibling.setAttribute('data-active', 'false')
    })
  })
}

export default initWindows
